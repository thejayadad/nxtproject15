import CardBox from "./card-box"


export const LoginForm = () => {
    return (
        <CardBox
        headerTitle="Welcome Back!"
        backButtonTitle="Dont have an account?"
        backButtonHref="/register"
        showSocial
        >
            LoginForm
        </CardBox>
    )
}