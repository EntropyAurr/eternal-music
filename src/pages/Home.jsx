import Heading from "../ui/Heading";

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
        <Heading as="h2">Home</Heading>
      </div>
    </div>
  );
}

export default Home;
