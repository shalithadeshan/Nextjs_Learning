// import { useEffect, useState } from "react";
import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";

const dummyMeetups = [
  {
    id: 1,
    title: "Meetup 1",
    image:
      "https://corporette.com/wp-content/uploads/2017/03/best-places-for-informal-business-meetings-for-women-lawyers-consultants-and-more.jpg",
    address: "Location 1",
    description: "Description 1",
  },
  {
    id: 2,
    title: "Meetup 2",
    image:
      "https://corporette.com/wp-content/uploads/2017/03/best-places-for-informal-business-meetings-for-women-lawyers-consultants-and-more.jpg",
    address: "Location 2",
    description: "Description 2",
  },
];

function HomePage(props) {
  // const [loadedMeetups, setLoadedMeetups] = useState([]);

  // useEffect(() => {
  //   setLoadedMeetups(dummyMeetups);
  // }, []);
  // return <MeetupList meetups={loadedMeetups} />;
  return (
    <Fragment>
      <Head>
        <title>Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active react Meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />;
    </Fragment>
  );
}

// this will run on the server after deployment (every incoming request)
// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   return {
//     props: {
//       meetups: dummyMeetups,
//     },
//   };
// }
// this function is called when the page is loaded not component function
// also this will run in the build process
export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://shalitha:shalitha@cluster0.xchmn.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupCollection = db.collection("meetups");

  const meetups = await meetupCollection.find().toArray();

  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10, // this will regenerate the page every 10 seconds in the server
  };
}

export default HomePage;
