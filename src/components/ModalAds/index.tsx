import { 
    PropsWithChildren, 
    useState, 
    useEffect,
    FormEvent 
} from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { Check, GameController, CaretDown } from 'phosphor-react';
import { Input, ButtonWeek } from '../index'
import axios from 'axios';

interface childrenProps extends PropsWithChildren{}

interface GamesProps {
    id: string;
    title: string;    
  }

export const ModalAds = ({children}:PropsWithChildren) => {
    
    const [games, setGames] = useState<GamesProps[]>([]);
    const [ weekDays, setWeekDays] = useState<string[]>([]);

    useEffect(() => {
        axios.get('http://localhost:3200/game')
        .then(({data}) => {
          setGames(data);
        });
      },[]);
    
    const handleCreatedAt = async (e:FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const data = Object.fromEntries(formData);
        const useVoiceChannel = data.hasOwnProperty('useVoiceChannel');
        const yearsPlaying = Number(data.yearsPlaying);

        if(!(data.game != "" && data.hoursStart != "" && data.hoursEnd != "" && data.name != "" ))
            return alert("Informe informações válidas!");
       
        try{
            await axios.post(`http://localhost:3200/game/${data.game}/ads`, 
            {...data,
                useVoiceChannel,
                yearsPlaying,
                weekDays: weekDays.map(Number)
            });
            alert("Criado com sucesso");
        }catch(e){
            console.log(e)
            alert("Erro ao criar anúncio");
        }
        
    }

    return(
        <Dialog.Root>
            {children}
            <Dialog.Portal>
                <Dialog.Overlay className='bg-black/60 inset-0 fixed'/>

                <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25'>
                    <Dialog.Title className="text-3xl font-black">Publique um anúncio</Dialog.Title>

                    <form onSubmit={handleCreatedAt} className="mt-8 flex flex-col gap-4">

                        <div className="flex flex-col gap-2">
                            <label  htmlFor="game" className="font-semibold" >Qual o game?</label>
                            <select 
                                id="game" 
                                name="game"
                                defaultValue=""
                                className="bg-zinc-900 py-3 px-4 rounded text-sm text-zinc-500 placeholder:text-zinc-500"
                            >
                                <option value="" disabled className='text-zinc-900'>Selecione o game que deseja jogar</option>
                                {games.map(game => 
                                    <option 
                                        key={game.id}
                                        value={game.id} 
                                        className='text-zinc-900'
                                    >
                                        {game.title}
                                    </option>
                                )}
                                
                            </select>                           

                        </div>

                        <div className="flex flex-col gap-2">
                            <label  htmlFor="name">Seu nome (ou nickname)</label>
                            <Input id="name" name="name" type="text" placeholder="Como te chamam dentro do game?" />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label  htmlFor="yearsPlaying">Joga há quantos anos?</label>
                                <Input id="yearsPlaying" name="yearsPlaying" type="number" placeholder="Tudo bem ser ZERO" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label  htmlFor="discord">Qual seu Discord?</label>
                                <Input id="discord" name="discord" type="text" placeholder="Usuario#0000" />
                            </div>
                        </div>
                        
                        <div className="flex gap-6">
                            <div className="flex flex-col gap-2">
                                <label  htmlFor="weekDays">Quando costuma jogar?</label>
                                <ToggleGroup.Root 
                                    type='multiple' 
                                    className="grid grid-cols-4 gap-2"
                                    value={weekDays}
                                    onValueChange={setWeekDays}
                                >
                                    <ButtonWeek title="Domingo" description='D' value="0" active={weekDays.includes('0') } />
                                    <ButtonWeek title="Segunda" description='S' value="1" active={weekDays.includes('1')}/>
                                    <ButtonWeek title="Terça" description='T' value="2"  active={weekDays.includes('2')}/>
                                    <ButtonWeek title="Quarta" description='Q' value="3" active={weekDays.includes('3')}/>
                                    <ButtonWeek title="Quinta" description='Q' value="4" active={weekDays.includes('4')}/>
                                    <ButtonWeek title="Sexta" description='S' value="5" active={weekDays.includes('5')}/>
                                    <ButtonWeek title="Sábado" description='S' value="6" active={weekDays.includes('6')}/>

                                </ToggleGroup.Root>
                                
                            </div>

                            <div className="flex flex-col gap-2 flex-1">
                                <label  htmlFor="hoursStart">Qual horário do dia?</label>
                                <div className="grid grid-cols-2 gap-2">
                                    <Input id="hoursStart" name="hoursStart" type="time" placeholder="De" />
                                    <Input id="hoursEnd" name="hoursEnd" type="time" placeholder="Até" />
                                </div>
                            </div>
                        </div>

                        <div className="mt-2 flex gap-2 text-sm items-center">
                            <Checkbox.Root id="useVoiceChannel" name="useVoiceChannel" className='w-6 h-6 rounded bg-zinc-900 p-1'>
                                <Checkbox.Indicator>
                                    <Check className="w-4 h-4 text-emerald-400" />
                                </Checkbox.Indicator>
                            </Checkbox.Root>                            
                            <label htmlFor="useVoiceChannel"> Costumo me conectar ao chat de voz</label>                                
                        </div>
                        <footer className="mt-4 flex justify-end gap-4">
                            <Dialog.Close className="bg-zinc-500 px-5  h-12 rounded-md font-semibold hover:bg-zinc-600" >Cancelar</Dialog.Close>
                            <button type="submit" className="bg-violet-500  px-5 h-12 flex rounded-md items-center font-semibold gap-3 hover:bg-violet-600"><GameController size={24} />Encontrar duo</button>
                        </footer>                        
                    </form>
                    
                </Dialog.Content>
            </Dialog.Portal>            
        </Dialog.Root>
    );
}