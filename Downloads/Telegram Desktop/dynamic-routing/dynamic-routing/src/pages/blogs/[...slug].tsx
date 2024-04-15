import { inter } from "@/fonts"

interface Props {
    slug: string[]
}

export default function BlogDetails({ slug }: Props) {
    return (
        <div className={inter.className} style={{fontSize: 30}}>
            {slug}
        </div>
    )
}


export function getServerSideProps(context: any) {
    return {
        props:
        {
            slug: context.params.slug
        }
    }
}