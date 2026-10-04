import { useState } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  IconButton,
  Box,
  Backdrop,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FullscreenIcon from "@mui/icons-material/Fullscreen";

const Certificate = ({
  ImgSertif,
  title,
  issuer,
  year,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      component="div"
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      {/* Certificate Card */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          borderRadius: 3,
          background:
            "linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.025))",
          border: "1px solid rgba(255,255,255,0.10)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
          transition:
            "transform 0.3s ease, box-shadow 0.3s ease",
          height: "100%",

          "&:hover": {
            transform: "translateY(-6px)",
            boxShadow:
              "0 18px 40px rgba(99,102,241,0.18)",
          },
        }}
      >
        {/* Certificate Image */}
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
          }}
        >
          <img
            src={ImgSertif}
            alt={title || "Certificate"}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              objectFit: "cover",
              aspectRatio: "16/11.5",
              filter:
                "contrast(1.05) brightness(0.95) saturate(1.05)",
              transition: "transform 0.5s ease",
              cursor: "pointer",
            }}
            onClick={handleOpen}
          />

          {/* Hover Overlay */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(3,0,20,0.75), rgba(3,0,20,0.05))",
              opacity: 0,
              transition: "opacity 0.3s ease",
              cursor: "pointer",

              "&:hover": {
                opacity: 1,
              },

              "&:hover .hover-content": {
                transform:
                  "translate(-50%, -50%)",
                opacity: 1,
              },
            }}
            onClick={handleOpen}
          >
            <Box
              className="hover-content"
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform:
                  "translate(-50%, -40%)",
                opacity: 0,
                transition: "all 0.35s ease",
                textAlign: "center",
                color: "white",
                width: "100%",
              }}
            >
              <FullscreenIcon
                sx={{
                  fontSize: 38,
                  mb: 0.5,
                }}
              />

              <Typography
                sx={{
                  fontSize: "0.95rem",
                  fontWeight: 600,
                }}
              >
                View Certificate
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Certificate Information */}
        <Box
          sx={{
            padding: "16px",
            minHeight: "105px",
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontSize: "1rem",
              fontWeight: 700,
              lineHeight: 1.35,
              mb: 0.8,
            }}
          >
            {title || "Certificate"}
          </Typography>

          {issuer && (
            <Typography
              sx={{
                color: "#a5a5b8",
                fontSize: "0.82rem",
                lineHeight: 1.4,
              }}
            >
              {issuer}
            </Typography>
          )}

          {year && (
            <Typography
              sx={{
                color: "#a78bfa",
                fontSize: "0.78rem",
                fontWeight: 600,
                mt: 0.8,
              }}
            >
              {year}
            </Typography>
          )}
        </Box>
      </Box>

      {/* Fullscreen Certificate */}
      <Modal
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 300,
          sx: {
            backgroundColor: "rgba(0,0,0,0.92)",
            backdropFilter: "blur(6px)",
          },
        }}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: 0,
          padding: 0,
        }}
      >
        <Box
          sx={{
            position: "relative",
            maxWidth: "92vw",
            maxHeight: "92vh",
            outline: "none",
          }}
        >
          {/* Close Button */}
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 14,
              top: 14,
              color: "white",
              bgcolor: "rgba(0,0,0,0.65)",
              zIndex: 2,
              padding: 1,

              "&:hover": {
                bgcolor: "rgba(0,0,0,0.85)",
                transform: "scale(1.08)",
              },
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Full Image */}
          <img
            src={ImgSertif}
            alt={`${title || "Certificate"} Full View`}
            style={{
              display: "block",
              maxWidth: "92vw",
              maxHeight: "92vh",
              margin: "0 auto",
              objectFit: "contain",
              borderRadius: "8px",
            }}
          />
        </Box>
      </Modal>
    </Box>
  );
};

Certificate.propTypes = {
  ImgSertif: PropTypes.string.isRequired,
  title: PropTypes.string,
  issuer: PropTypes.string,
  year: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

export default Certificate;