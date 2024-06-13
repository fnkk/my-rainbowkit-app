import { useRouter } from "next/router";
export default function Home() {
  const router = useRouter()  
  return (
      <div>
        <h1>Home Page</h1>
        <button onClick={()=>router.push('/about')}>
          to About
        </button>
      </div>
    );
  }