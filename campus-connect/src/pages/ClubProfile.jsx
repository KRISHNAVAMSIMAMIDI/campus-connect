import ClubProfileCard from "../components/ClubProfileCard";

function ClubProfile() {

  const club = {

    name: "Coding Club",

    tagline: "Code • Build • Innovate",

    logo:
      "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",

    banner:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",

    about:
      "Coding Club helps students learn programming, web development, competitive coding and software engineering through workshops and projects.",

    vision:
      "To build a strong technical community that inspires innovation and problem-solving.",

    mission: [
      "Conduct technical workshops",
      "Organize coding contests",
      "Build real-world projects",
      "Prepare students for hackathons",
    ],

    faculty: "Dr. Srinivas Rao",

    team: [
      "President - Jayaram",
      "Vice President - Sai",
      "Technical Lead - Charan",
      "Design Lead - Karthik",
      "Content Lead - Harsha",
    ],

    events: [
      "Web Development Bootcamp",
      "DSA Workshop",
      "Hackathon 2026",
      "Git & GitHub Session",
    ],

    gallery: [
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
      "https://images.unsplash.com/photo-1515169067868-5387ec356754",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    ],

    recruitment: "🟢 Open",
  };

  return (

    <div
      style={{
        background: "#FDFDFD",
        minHeight: "100vh",
        paddingBottom: "40px",
      }}
    >

      <ClubProfileCard
        club={club}
        isAdmin={false}
      />

    </div>

  );
}

export default ClubProfile;