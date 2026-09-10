"use server"

import { Resend } from "resend"
import { headers } from "next/headers"
import { z } from "zod"
import { isRateLimited } from "@/lib/rate-limit"

const resend = new Resend(process.env.RESEND_API_KEY)

const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(200),
  message: z.string().trim().min(10).max(4000),
  // Honeypot: real visitors never see or fill this field. Any value means a bot.
  company: z.string().max(0).optional().default(""),
})

type SendEmailData = z.infer<typeof contactSchema>

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

export async function sendEmail(data: SendEmailData) {
  const ip = headers().get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"

  if (isRateLimited(ip)) {
    return { success: false, error: "Too many requests. Please try again later." }
  }

  const parsed = contactSchema.safeParse(data)
  if (!parsed.success) {
    return { success: false, error: "Invalid submission." }
  }
  if (parsed.data.company) {
    // Honeypot tripped — pretend success so bots don't learn to adapt.
    return { success: true }
  }

  const name = escapeHtml(parsed.data.name)
  const email = escapeHtml(parsed.data.email)
  const message = escapeHtml(parsed.data.message)

  try {
    const { data: emailData, error } = await resend.emails.send({
      from: "M&M Solutions <onboarding@resend.dev>", // Resend sandbox email
      to: "malazshukri.contactme@gmail.com",
      replyTo: parsed.data.email,
      subject: `New Contact Form Message from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
              .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; }
              .field { margin-bottom: 20px; }
              .label { font-weight: bold; color: #1e40af; margin-bottom: 5px; }
              .value { background: white; padding: 12px; border-radius: 6px; border: 1px solid #e5e7eb; }
              .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2 style="margin: 0;">New Contact Form Submission</h2>
                <p style="margin: 5px 0 0 0; opacity: 0.9;">M&M Solutions Website</p>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">Name:</div>
                  <div class="value">${name}</div>
                </div>
                <div class="field">
                  <div class="label">Email:</div>
                  <div class="value">${email}</div>
                </div>
                <div class="field">
                  <div class="label">Message:</div>
                  <div class="value" style="white-space: pre-wrap;">${message}</div>
                </div>
              </div>
              <div class="footer">
                <p>This message was sent from your M&M Solutions website contact form.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    })

    if (error) {
      console.error("[contact] Resend API error:", error)
      return { success: false, error: "Failed to send email." }
    }

    return { success: true }
  } catch (error) {
    console.error("[contact] Failed to send email:", error)
    return { success: false, error: "Failed to send email." }
  }
}
