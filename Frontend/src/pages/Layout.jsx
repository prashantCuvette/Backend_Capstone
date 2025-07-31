import { useEffect, useState } from "react";
import MemoryCard from "../components/MemoryCard";
import CreateMemoryModal from "../components/CreateMemoryModal";
import DummyData from "../assets/data"; // Array of Objects

const Layout = () => {
  const token = true; // mock auth

  const [memories, setMemories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const ITEMS_PER_PAGE = 8;

  const fetchMemories = async (page = 1) => {
    setLoading(true);
    try {
      // Simulate pagination logic using DummyData
      const startIndex = (page - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;

      const paginatedData = DummyData.slice(startIndex, endIndex);
      const pages = Math.ceil(DummyData.length / ITEMS_PER_PAGE);

      setMemories(paginatedData);
      setTotalPages(pages);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error simulating fetch:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchMemories(currentPage);
    }
  }, [currentPage]);

  const handlePageClick = (page) => {
    if (page !== currentPage) {
      fetchMemories(page);
    }
  };

  const handleAddMemory = (newMemory) => {
    const memoryObj = {
      id: Date.now(),
      image: URL.createObjectURL(newMemory.image),
      title: newMemory.title,
      description: newMemory.description,
      date: new Date().toLocaleDateString(),
    };

    const updatedData = [memoryObj, ...DummyData];
    const paginatedData = updatedData.slice(0, ITEMS_PER_PAGE);

    setMemories(paginatedData);
    setTotalPages(Math.ceil(updatedData.length / ITEMS_PER_PAGE));
    setCurrentPage(1);
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
                  <MemoryCard key={memory.id} {...memory} />
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
