import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const PaginationMui = ({ page, pageHandle, dynamicPage }) => {
  return (
    <div className="flex justify-center mt-10">
      <Stack spacing={2}>
        <Pagination
          count={dynamicPage}
          page={page}
          onChange={(e, value) => {
            pageHandle(value);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          variant="outlined"
          shape="rounded"
          sx={{
            "& .MuiPaginationItem-root": {
              borderColor: "#e5e7eb",
            },
            "& .MuiPaginationItem-root:hover": {
              backgroundColor: "red",
              color: "white",
            },
            "& .MuiPaginationItem-root.Mui-selected": {
              backgroundColor: "red",
              color: "white",
            },
          }}
        />
      </Stack>
    </div>
  );
};

export default PaginationMui;