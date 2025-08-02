import { useEffect, useState } from "react";
import MemoryCard from "../components/MemoryCard";
import CreateMemoryModal from "../components/CreateMemoryModal";

const API_URL = import.meta.VITE_API_URL;
const Layout = () => {
  const [memories, setMemories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // homework

  const ITEMS_PER_PAGE = 8;

  // can get token from auth state also
  const fetchMemories = async (page = 1) => {
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:3000/api/memories?page=${page}&limit=${ITEMS_PER_PAGE}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Failed to fetch Memories");
      }

      setMemories(data.memories || []);
      setTotalPages(data.totalPages || 1);
      setCurrentPage(data.currentPage || 1);
    } catch (error) {
      console.log("Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMemories(currentPage);
  }, [currentPage]);

  const handlePageClick = (page) => {
    if (page < 1 || page > totalPages) return; // Prevent invalid page clicks

    fetchMemories(page);
  };

  const handleAddMemory = async (newMemory) => {
    const token = localStorage.getItem("token");
    try {

      if(!newMemory.image || !newMemory.title || !newMemory.description) {
        console.log("Title and description are required");
        return;
      }

      const formData = new FormData();
      formData.append("image", newMemory.image);
      formData.append("title", newMemory.title);
      formData.append("description", newMemory.description);

      const response = await fetch(`http://localhost:3000/api/memories`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error creating memory:", errorData.message);
      }

      const data = await response.json();
      console.log(data);

      // setMemories((prev) => [...prev, data.memory]);

      fetchMemories(currentPage); // Refresh the list after adding a new memory
      setCurrentPage(1); // Reset to the first page
      setShowModal(false); // Close the modal after saving
    } catch (error) {
      console.log("Error adding memory:", error.message);
    }
  };

  return (
    <div>
      {/* Main Section */}
      <div style={{ display: "flex", padding: "20px", gap: "20px" }}>
        {/* Left Section (70%) */}
        <div style={{ flex: 7 }}>
          {loading ? (
            <h2>Loading memories...</h2>
          ) : (
            <>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "15px",
                }}
              >
                {memories.map((memory) => (
                  <MemoryCard key={memory._id} {...memory} />
                ))}
              </div>

              {/* Pagination */}
              <div
                style={{
                  marginTop: "20px",
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                  flexWrap: "wrap",
                }}
              >
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (num) => (
                    <button
                      key={num}
                      onClick={() => handlePageClick(num)}
                      style={{
                        padding: "8px 12px",
                        backgroundColor: num === currentPage ? "#333" : "#fff",
                        color: num === currentPage ? "#fff" : "#000",
                        border: "1px solid #ccc",
                        cursor: "pointer",
                      }}
                    >
                      {num}
                    </button>
                  )
                )}
              </div>
            </>
          )}
        </div>

        {/* Right Section (30%) */}
        <div style={{ flex: 3 }}>
          <button
            onClick={() => setShowModal(true)}
            style={{
              padding: "10px 15px",
              width: "100%",
              marginBottom: "20px",
            }}
          >
            Create Memory
          </button>

          <input
            type="text"
            placeholder="Search memories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "10px",
              width: "100%",
              marginBottom: "10px",
              boxSizing: "border-box",
            }}
          />

          <button style={{ padding: "10px", width: "100%" }}>Search</button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <CreateMemoryModal
          onClose={() => setShowModal(false)}
          onSave={handleAddMemory}
        />
      )}
    </div>
  );
};

export default Layout;
