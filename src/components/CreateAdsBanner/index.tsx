import {MagnifyingGlassPlus } from 'phosphor-react';
import * as Dialog from '@radix-ui/react-dialog';

export const CreateAdsBanner = () => {
    return (
        <div className="bg-nlw-gradient pt-1 self-stretch rounded-t-lg rounded-b-xl mt-8">
          <div className="bg-[#2A2634] px-8 py-6 self-stretch rounded-lg flex justify-between items-center">
            <div className=''>
              <strong className="text-2xl text-white font-black block">Não encontrou seu duo?</strong>
              <span className="text-zinc-400 block">Publique um anúncio para encontrar novos players!</span>
            </div>
            <Dialog.Trigger className="bg-violet-500 text-white px-4 py-3 rounded hover:bg-violet-600 flex items-center gap-3"> 
              <MagnifyingGlassPlus size={20} /> Publicar anúncio
            </Dialog.Trigger>
          </div>  
        </div>
    );
}