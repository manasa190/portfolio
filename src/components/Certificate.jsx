import React, { useState } from "react";
import { Modal, IconButton, Box, Typography, Backdrop } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import { motion, AnimatePresence } from 'framer-motion';

export const certificatesData = [
  {
    id: 1,
    title: "AI Skills Passport",
    issuer: "EY & Microsoft",
    image: "/images/certificates/ai-skills.png",
    date: "2025"
  },
  {
    id: 2,
    title: "Software Engineering Virtual Experience Program",
    issuer: "JPMorgan Chase & Co (Forage)",
    image: "/images/certificates/jpmc.png",
    date: "2025"
  },
  {
    id: 3,
    title: "Data Science Foundations - Level 1",
    issuer: "IBM",
    image: "/images/certificates/ibm.png",
    date: "2025"
  },
  {
    id: 4,
    title: "Data Analytics Job Simulation",
    issuer: "Deloitte (Forage)",
    image: "/images/certificates/deloitte.png",
    date: "2025"
  },
  {
    id: 5,
    title: "GenAI 101 with Pieces",
    issuer: "LetsUpgrade",
    image: "/images/certificates/genai.png",
    date: "2025"
  },
  {
    id: 6,
    title: "Generative AI Workshop",
    issuer: "NxtWave",
    image: "/images/certificates/nxtwave.png",
    date: "2025"
  },
  {
    id: 7,
    title: "Introduction to Data Science",
    issuer: "Infosys Springboard",
    image: "/images/certificates/infosys.png",
    date: "2025"
  }
];

const Certificate = ({ ImgSertif, title, issuer, date }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div
        className="group relative w-full h-full transform transition-all duration-300 hover:scale-105"
        style={{ perspective: '1000px' }}
        onClick={handleOpen}
      >
        <div 
          className="relative w-full h-full bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-purple-500/20 flex flex-col"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="relative overflow-hidden rounded-lg mb-6">
            <img
              src={ImgSertif}
              alt={title || "Certificate"}
              className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50">
              <FullscreenIcon sx={{ fontSize: 50, color: 'white' }} />
            </div>
          </div>
          
          <div className="flex flex-col flex-grow">
            <Typography 
              variant="h6" 
              className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
              sx={{ mb: 1 }}
            >
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary" className="mt-auto">
              {issuer}
            </Typography>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <Modal
            open={open}
            onClose={handleClose}
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
              sx: { backgroundColor: "rgba(0, 0, 0, 0.9)", backdropFilter: "blur(8px)" },
            }}
            className="flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Box sx={{ position: "relative", width: "auto", maxWidth: "90vw", maxHeight: "90vh" }}>
                <IconButton
                  onClick={handleClose}
                  sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                    color: "white",
                    bgcolor: "rgba(0,0,0,0.7)",
                    zIndex: 1,
                    "&:hover": { bgcolor: "rgba(0,0,0,0.9)" },
                  }}
                >
                  <CloseIcon />
                </IconButton>
                <img
                  src={ImgSertif}
                  alt={title || "Certificate Full View"}
                  style={{ display: "block", maxWidth: "100%", maxHeight: "90vh", margin: "0 auto", objectFit: "contain", borderRadius: '8px' }}
                />
              </Box>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default Certificate;