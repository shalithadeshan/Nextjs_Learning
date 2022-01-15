import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import { Fragment } from "react";
import Head from "next/head";

function MeetupDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      ></MeetupDetail>{" "}
    </Fragment>
  );
}

// this function should add if page dynamic and using getStaticProps
export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://shalitha:shalitha@cluster0.xchmn.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupCollection = db.collection("meetups");

  const meetups = await meetupCollection.find({}, { _id: 1 }).toArray();

  client.close();
  return {
    fallback: true,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  // fetch data for a single meetup
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://shalitha:shalitha@cluster0.xchmn.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupCollection = db.collection("meetups");

  const meetup = await meetupCollection.findOne({ _id: ObjectId(meetupId) });

  client.close();
  console.log("meetupId", meetupId);
  return {
    props: {
      meetupData: {
        id: meetup._id.toString(),
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        description: meetup.description,
      },
    },
  };
}

export default MeetupDetails;
