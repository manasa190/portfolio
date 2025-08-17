import React, { useState } from "react";
import { Github, ExternalLink, X } from "lucide-react";
import { Modal, Box, Typography, IconButton, Chip, Button, Backdrop } from "@mui/material";
import { motion, AnimatePresence } from 'framer-motion';

const CardProject = ({
  Img,
  Title,
  Description,
  Link: ProjectLink,
  github,
  tech = [],
  date,
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

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
          {Img && (
            <div className="relative overflow-hidden rounded-lg mb-6">
              <img
                src={Img}
                alt={Title}
                className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            </div>
          )}

          <div className="flex flex-col flex-grow">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-semibold text-white/90">{Title}</h3>
              {date && <span className="text-sm text-gray-400">{date}</span>}
            </div>

            <p
              className="text-gray-400 text-sm leading-relaxed mt-2"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {Description}
            </p>
            <div className="mt-auto pt-4">
              <div className="flex flex-wrap gap-2">
                {tech.slice(0, 3).map((item, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-xs rounded-full bg-purple-500/20 text-purple-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <Modal
            open={showModal}
            onClose={(e) => { e.stopPropagation(); handleClose(); }}
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
              sx: {
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                backdropFilter: "blur(8px)",
              },
            }}
            className="flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Box
                sx={{
                  bgcolor: "#18182a",
                  color: "white",
                  width: "100%",
                  maxWidth: "600px",
                  maxHeight: "90vh",
                  overflowY: "auto",
                  borderRadius: "16px",
                  p: 4,
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  position: "relative",
                }}
                className="custom-scrollbar"
              >
                <IconButton
                  onClick={(e) => { e.stopPropagation(); handleClose(); }}
                  sx={{ position: "absolute", right: 16, top: 16, color: "white" }}
                >
                  <X />
                </IconButton>

                <Typography
                  variant="h4"
                  component="h2"
                  gutterBottom
                  sx={{
                    fontWeight: "bold",
                    background: "linear-gradient(to right, #6366f1, #a855f7)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {Title}
                </Typography>

                {date && (
                  <Typography
                    variant="caption"
                    sx={{ color: "grey.500", mb: 2, display: "block" }}
                  >
                    {date}
                  </Typography>
                )}

                {Img && (
                  <img src={Img} alt={Title} className="w-full h-auto rounded-lg mb-4" />
                )}

                <Typography variant="body1" sx={{ color: "grey.300", mb: 3 }}>
                  {Description}
                </Typography>

                <Typography variant="h6" sx={{ color: "white", mb: 2 }}>
                  Tech Stack
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 4 }}>
                  {tech.map((item, idx) => (
                    <Chip
                      key={idx}
                      label={item}
                      sx={{
                        backgroundColor: "rgba(168, 85, 247, 0.2)",
                        color: "#c4b5fd",
                      }}
                    />
                  ))}
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    justifyContent: "flex-end",
                    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                    pt: 3,
                  }}
                >
                  {github && (
                    <Button
                      variant="outlined"
                      href={github}
                      target="_blank"
                      startIcon={<Github />}
                      onClick={(e) => e.stopPropagation()}
                      sx={{
                        color: "white",
                        borderColor: "rgba(255, 255, 255, 0.2)",
                        "&:hover": {
                          borderColor: "white",
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                        },
                      }}
                    >
                      Source Code
                    </Button>
                  )}
                  {ProjectLink && (
                    <Button
                      variant="contained"
                      href={ProjectLink}
                      target="_blank"
                      startIcon={<ExternalLink />}
                      onClick={(e) => e.stopPropagation()}
                      sx={{ background: "linear-gradient(to right, #6366f1, #a855f7)" }}
                    >
                      Live Demo
                    </Button>
                  )}
                </Box>
              </Box>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default CardProject;