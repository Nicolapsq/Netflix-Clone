import { Link } from 'react-router-dom';

export default function HomePubblica() {
    return (
        <div className='home-pubblica'>

            {/* sezione home */}
            <div  className='sezione-home'>
                <h1>
                    Film, serie TV e molto altro
                </h1>
                <p className='p-1'>
                    Guarda ovunque. Disdici quando vuoi.
                </p>
                <p className='p-2'>
                    Vuoi guardare subito? Registrati per creare il tuo account.
                </p>
                <Link className='link' to="/register">
                    Inizia ora
                </Link>
            </div>

            {/* Sezione features */}
            <div className='sezione-features'>
                <div className='div-0'>
                    <div className='div-1'>
                        <h2>
                            Guarda su TV
                        </h2>
                        <p>
                            Guarda su Smart TV, PlayStation, Xbox, Chromecast, Apple TV, lettori Blu-ray e altri dispositivi.
                        </p>
                    </div>
                    <div className='div-2'>
                        📺
                    </div>
                </div>
            </div>

            {/* Sezione download */}
            <div className='sezione-download'>
                <div className='div-0'>
                    <div className='div-1'>
                        📱
                    </div>
                    <div className='div-2'>
                        <h2>
                            Scarica le serie per guardarle offline
                        </h2>
                        <p>
                            Salva i tuoi contenuti preferiti e avrai sempre qualcosa da guardare.
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
}
