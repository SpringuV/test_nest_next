import Verify from "@/components/auth/verify"
interface VerifyPageProps {
  params: Promise<{ id: string }>
}
const VerifyPage = async ({ params }: VerifyPageProps) => {
    const { id } = await params
    return (
        <>
            VerifyPage {id}
            <Verify codeId={id}/>
        </>
    )
}

export default VerifyPage