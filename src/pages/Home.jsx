// const StyledHome = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 1rem;
// `;

// const Header = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   gap: 1.5rem;
// `;

function Home() {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold">Home</h2>
      </div>
    </div>
  );
}

export default Home;
