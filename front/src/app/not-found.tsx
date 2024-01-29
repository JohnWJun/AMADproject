import Link from "next/link";
import {NextPage} from "next";

const NotFound: NextPage = ()=> {
return (

<div>
page is not found. Search other page
<Link href= "/seach"> search </Link>
</div>
)

}

export default NotFound;