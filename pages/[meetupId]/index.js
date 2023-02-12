import { MongoClient, ObjectId } from "mongodb"
import Head from "next/head";
import { Fragment } from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";


const MeetupDetails = ({meetupData}) => {
    return <Fragment>
        <Head>
            <title>{meetupData.title}</title>
            <meta name="description"
                content={meetupData.description} />
        </Head>
        <MeetupDetail image={meetupData.image}
            title={meetupData.title}
            description={meetupData.description}
            address={meetupData.address}
        />
    </Fragment>
}

export default MeetupDetails;


export const getStaticPaths = async () => {
    console.log("something")
    const client=await MongoClient.connect("mongodb+srv://Touney3108:31081999@meetups.muqbkdn.mongodb.net/?retryWrites=true&w=majority")
        const db = client.db();

    const meetupsCollection = db.collection("meetups");
    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
    client.close();
    return {
        paths: meetups.map(meetup => ({
                 params: { meetupId: meetup._id.toString() } })),
        fallback:false,
    };
}


export const getStaticProps = async (context) => {
    const meetupId = context.params.meetupId;

    const client = await MongoClient.connect("mongodb+srv://Touney3108:31081999@meetups.muqbkdn.mongodb.net/?retryWrites=true&w=majority")
    const db = client.db();
    const id = new ObjectId(meetupId);
    const meetupsCollection = db.collection("meetups");
    const selectedMeetup = await meetupsCollection.findOne({
        _id: id,
    });
    client.close();
    console.log(selectedMeetup)


    return {
        props: {
            meetupData: {
                id:selectedMeetup._id.toString(),
                image:selectedMeetup.image ,
                title:selectedMeetup.title ,
                description:selectedMeetup.description,
                address:selectedMeetup.address,
            }
        },
    };
}