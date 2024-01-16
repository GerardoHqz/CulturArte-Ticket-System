import React, {useMemo}from 'react';
import { ColorPicker } from 'antd';
import { Input } from 'antd';
import { useState } from 'react';
import { saveCategory } from '../../services/Category';
import toast from 'react-hot-toast';

const NewCategory = () => {
    const [show, setShow] = useState(false);
    const [colorHex, setColorHex] = useState('#1677ff');
    const [formatHex, setFormatHex] = useState('hex');
    const [name, setName] = useState('');

    const addCategory = async() => {
        const info = {nameCategory:name, color:colorHex}
        try{ 
            const response = await saveCategory(info,localStorage.getItem("token"));
            console.log(info);
            toast.success('Categoria creada con exito');
        }catch(error){
            console.log(error);
            toast.error('Error al crear la categoria');
        }
    }


    const handleColorChange = (color) => {        
        setColorHex(color.toHexString());
    };

    return (
        <div>
            <div>
                <button className="btn border border-grayborder text-grayborder px-4 py-2 rounded-md hover:bg-grayborder hover:text-white w-14vw max-sm:w-4/5" onClick={() => setShow(true)}>Agregrar nueva categoria</button>
            </div>
            <div>
                {show &&
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div class="bg-white w-1/5 rounded shadow-lg py-6 px-10">
                            <h2 className="text-2xl text-center font-semibold mb-4 text-blue font-montserrat">Nueva categoria</h2>
                            <div class="flex gap-10 mb-5 w-full">
                                <div class="w-9/12">
                                    <h2>Nombre</h2>
                                    <Input style={{width:'100%'}} onChange={(e) => setName(e.target.value)}/>
                                </div>
                                <div>
                                    Color
                                    <ColorPicker 
                                        format={formatHex}
                                        defaultValue={colorHex}
                                        onChange={handleColorChange}
                                        onFormatChange={setFormatHex} />
                                </div>
                            </div>
                            <button className="btn bg-blue text-white px-4 py-2 mr-1 rounded hover:bg-opacity-90 " onClick={() => {setShow(false); addCategory();}}>Agregar</button>
                            <button className="btn bg-grayborder text-white px-4 py-2 ml-1 rounded hover:bg-opacity-90 " onClick={() => setShow(false)}>Cancelar</button>
                        </div>
                    </div>
                }
            
            </div>
            
            
        </div>
    );
};

export default NewCategory;