import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import axios from "axios";
import toast from "react-hot-toast";
import { useGlobalLoaderContext } from "../../helpers/GlobalLoader"; // adjust path

export default function DeleteDiologueBox({ id, onDelete }) {
  const [open, setOpen] = useState(false);
  const { showLoader, hideLoader } = useGlobalLoaderContext();

  const handleClickOpen = () => setOpen(true);

  const handleDelete = async () => {
    try {
      showLoader();
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:8080/api/image/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update image list safely
      onDelete((prev) => {
        if (!Array.isArray(prev)) return [];
        return prev.filter((img) => img._id === undefined ? img.id !== id : img._id !== id);
      });

      toast.success("🗑️ Image deleted successfully!");
      setOpen(false);
    } catch (err) {
      console.error("Delete failed:", err);

      let message = "❌ Failed to delete image";
      if (err.response) {
        message = err.response.data?.message || `❌ Error ${err.response.status}`;
      } else if (err.request) {
        message = "❌ No response from server";
      } else {
        message = err.message;
      }

      toast.error(message);
    } finally {
      hideLoader();
    }
  };

  return (
    <>
      {/* Delete Button */}
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{
          width: "100%",
          background: "white",
          color: "red",
          fontWeight: "bold",
          borderColor: "red",
          "&:hover": {
            background: "red",
            color: "white",
            transform: "scale(1.05)",
          },
        }}
      >
        Delete
      </Button>

      {/* Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this image and its details?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => setOpen(false)}
            sx={{
              borderColor: "gray",
              color: "gray",
              "&:hover": { background: "lightgray", color: "black" },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="outlined"
            onClick={handleDelete}
            autoFocus
            sx={{
              borderColor: "green",
              color: "green",
              fontWeight: "bold",
              "&:hover": { background: "green", color: "white" },
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
