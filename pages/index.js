import MeetupList from "../components/meetups/MeetupList"
import { MongoClient } from "mongodb"
import { Fragment } from "react";
import Head from "next/head";



const HomePage = props => {
    return <Fragment>
        <Head>
            <title>React meetups</title>
            <meta name="description"
                content="Browse a gue list of ahighly active React meetups!" />
        </Head>
        <MeetupList meetups={props.meetups} />
    </Fragment>
}


//export async function getServerSideProps(context) {
//    
//    const req=context.req;
//    const res = context.res;
//
//    return {
//        props: {
//            meetups: DUMMY_MEETUPS,
//        },
//
//    };
//}

export async function getStaticProps() {
    const client=await MongoClient.connect("mongodb+srv://Touney3108:31081999@meetups.muqbkdn.mongodb.net/?retryWrites=true&w=majority")
        const db = client.db();

        const meetupsCollection = db.collection("meetups");
        const meetups = await meetupsCollection.find().toArray();
        client.close();

    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id:meetup._id.toString()
            })),
        },
        revalidate:10
    };
}

export default HomePage