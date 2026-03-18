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

interface DeleteTagDialogProps {
  isOpen: boolean
  onClose: () => void
  tagId: string
  tagName: string
  onDeleteSuccess?: () => void
}

export function DeleteTagDialog({
  isOpen,
  onClose,
  tagId,
  tagName,
  onDeleteSuccess,
}: DeleteTagDialogProps) {
  const queryClient = useQueryClient()

  const deleteTag = useMutation(
    queryApi.tag.delete.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: queryApi.article.key(),
        })
        await queryClient.invalidateQueries({
          queryKey: queryApi.feed.key(),
        })
        onDeleteSuccess?.()
        onClose()
        toast.success("Tag deleted successfully")
      },
      onError: (err: { message: string }) => {
        toast.error(err.message || "Failed to delete tag")
      },
    }),
  )

  const handleDelete = () => {
    deleteTag.mutate(tagId)
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogPopup>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Tag</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete "{tagName}"? This will remove the
            tag from all feeds. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogClose>
            <Button variant="secondary" disabled={deleteTag.isPending}>
              Cancel
            </Button>
          </AlertDialogClose>
          <Button
            onClick={handleDelete}
            disabled={deleteTag.isPending}
            variant="destructive"
          >
            {deleteTag.isPending ? "Deleting..." : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogPopup>
    </AlertDialog>
  )
}
