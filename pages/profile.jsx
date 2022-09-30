
const Profile = ()=>{
    return(
        <main>
            <h1>Profile</h1>
        </main>
    );
}

export const getServerSideProps  = async (context)=>{
    context.req.cookies = {tests:"tst"}
    console.log(context);
    return{
        props:{}
    }
}

export default Profile;