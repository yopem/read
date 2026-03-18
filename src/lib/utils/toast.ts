"use client"

import { toastManager } from "@/components/ui/toast"

type ToastType = "error" | "info" | "loading" | "success" | "warning"

interface ToastOptions {
  title: string
  description?: string
  type?: ToastType
}

function showToast({ title, description, type }: ToastOptions) {
  toastManager.add({
    title,
    description,
    type,
  })
}

export const toast = {
  success: (title: string, description?: string) =>
    showToast({ title, description, type: "success" }),
  error: (title: string, description?: string) =>
    showToast({ title, description, type: "error" }),
  info: (title: string, description?: string) =>
    showToast({ title, description, type: "info" }),
  warning: (title: string, description?: string) =>
    showToast({ title, description, type: "warning" }),
  loading: (title: string, description?: string) =>
    showToast({ title, description, type: "loading" }),
}
