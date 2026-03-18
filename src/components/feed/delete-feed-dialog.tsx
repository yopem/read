"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"

import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogPopup,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { queryApi } from "@/lib/orpc/query"
import { toast } from "@/lib/utils/toast"

interface DeleteFeedDialogProps {
  isOpen: boolean
  onClose: () => void
  feedId: string
  feedTitle: string
}

export function DeleteFeedDialog({
  isOpen,
  onClose,
  feedId,
  feedTitle,
}: DeleteFeedDialogProps) {
  const queryClient = useQueryClient()

  const deleteFeed = useMutation(
    queryApi.feed.delete.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: queryApi.feed.key(),
        })
        await queryClient.invalidateQueries({
          queryKey: queryApi.article.key(),
        })
        onClose()
        toast.success("Feed deleted successfully")
      },
      onError: (err: { message: string }) => {
        toast.error(err.message || "Failed to delete feed")
      },
    }),
  )

  const handleDelete = () => {
    deleteFeed.mutate(feedId)
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogPopup>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Feed</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete "{feedTitle}"? This will permanently
            remove the feed and all its articles. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogClose>
            <Button variant="secondary" disabled={deleteFeed.isPending}>
              Cancel
            </Button>
          </AlertDialogClose>
          <Button
            onClick={handleDelete}
            disabled={deleteFeed.isPending}
            variant="destructive"
          >
            {deleteFeed.isPending ? "Deleting..." : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogPopup>
    </AlertDialog>
  )
}
