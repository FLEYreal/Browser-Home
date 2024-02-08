// Insides
import ActionBar from './action-bar'
import TitleContainer from './title'
import Hints from './hints'

export default function Header() {

    return (
        <header className='flex my-7 items-center justify-between h-12'>

            <TitleContainer />
            <Hints />
            <ActionBar />

        </header>
    )
}