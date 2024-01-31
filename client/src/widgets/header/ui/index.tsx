// Insides
import ActionBar from './action-bar'
import TitleContainer from './title'

export default function Header() {
    return (
        <header className='flex my-11 items-center justify-between'>

            <TitleContainer />
            <ActionBar />

        </header>
    )
}