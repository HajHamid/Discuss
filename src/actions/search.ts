import { redirect } from "next/navigation"


export function search(formData: FormData) {
    const terms = formData.get('search')

    if (!terms) {
        redirect('/')
    }

    redirect(`/search/?terms=${terms}`)
}