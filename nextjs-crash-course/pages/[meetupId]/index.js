import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails() {
  return (
    <div>
      <MeetupDetail
        image="https://corporette.com/wp-content/uploads/2017/03/best-places-for-informal-business-meetings-for-women-lawyers-consultants-and-more.jpg"
        title="A First Meetup"
        address="address"
        description="description"
      ></MeetupDetail>{" "}
    </div>
  );
}

// this function should add if page dynamic and using getStaticProps
export async function getStaticPaths() {
  return {
    fallback: false,
    paths: [
      {
        params: {
          meetupId: "1",
        },
      },
      {
        params: {
          meetupId: "2",
        },
      },
    ],
  };
}

export async function getStaticProps(context) {
  // fetch data for a single meetup
  const meetupId = context.params.meetupId;
  console.log("meetupId", meetupId);
  return {
    props: {
      meetupData: {
        image:
          "https://corporette.com/wp-content/uploads/2017/03/best-places-for-informal-business-meetings-for-women-lawyers-consultants-and-more.jpg",
        title: "A First Meetup",
        address: "address",
        description: "description",
        id: "1",
      },
    },
  };
}

export default MeetupDetails;
