const MemoryCard = ({ image, title, description, date }) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        borderRadius: "5px",
      }}
    >
      <img
        src={image}
        alt={title}
        style={{ width: "100%", height: "150px", objectFit: "cover" }}
      />
      <h3>{title}</h3>
      <p>{description}</p>
      <small>{date}</small>
    </div>
  );
};

export default MemoryCard;
