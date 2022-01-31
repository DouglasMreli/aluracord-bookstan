import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js';
import { useRouter} from 'next/router';
import { ButtonSendSticker } from '../src/components/ButtonSendSticker';

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzI4NzkyOSwiZXhwIjoxOTU4ODYzOTI5fQ.41yJrF4xHkC7vp5q-AwhU4Iek55Np6OMS8COjxwGJGA';
const SUPABASE_URL = 'https://vbajbmufiavjarvnjtfk.supabase.co';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function escutaMensagemEmTempoReal(adicionaMensagem) {
    return supabaseClient
    .from('mensagens')
    .on('INSERT', (respostaLive) => {
        adicionaMensagem(respostaLive.new);
    })
    .subscribe();
}

export default function ChatPage() {
    /*
   // Usuário
       - Usuário digita no campo text area
       - Aperta enter para enviar
       - Tem que adicionar o texto na lista de mensagem
   //Dev
       - Criar o campo
       - Usar o onChange, usar o useState e verificar se a string termina com ENTER
           para carregar a mensagem na lista e limpar a variável
       - Lista de mensagem  
   */

    // A lógica vai aqui
    const roteamento = useRouter();
    const usuarioLogado = roteamento.query.username;
    //console.log(usuarioLogado);
    //console.log('roteamento.query: ', roteamento.query);
    const [mensagem, setMensagem] = React.useState('');
    const [listaDeMensagens, setListaDeMensagens] = React.useState([
       
    ]);

    React.useEffect(() => {
        supabaseClient
        .from('mensagens')
        .select('*')
        .order('id', { ascending: false })
        .then(({data}) => {
            setListaDeMensagens(data);
        });

         escutaMensagemEmTempoReal((novaMensagem) => {
            console.log('nova mensagem', novaMensagem);
            setListaDeMensagens((valorAtualDaLista) => {
                
                return [
                    novaMensagem,
                    ...valorAtualDaLista,
                ]
            });
        });
        
    }, []);

    function handleNovaMensagem(novaMensagem) {
        const mensagem = {
            // id: listaDeMensagens.length + 1,
            de: usuarioLogado,
            texto: novaMensagem,
        };

        supabaseClient
        .from('mensagens')
        .insert([mensagem])
        .then(({ data }) => {
            console.log('Criando mensagem: ', data);
        });
       
        setMensagem('');
    }
    // a lógica vai até aqui
    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)`,
                backgroundImage: 'url(https://1.bp.blogspot.com/-oPMAj_aKWno/XrtxEOnlpaI/AAAAAAAAvUw/gP7D0tFjBUQ2n3J_q__ar3YUfAPL1WbLACLcBGAsYHQ/s2560/books_library_shelves_138556_3840x2160.jpg)',
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >
                    {/*{listaDeMensagens.map((mensagemAtual) =>{
                        return(
                            <li key={mensagemAtual.id}>
                                {mensagemAtual.de} : {mensagemAtual.texto}
                            </li>
                        )
                    })}*/}
                    <MessageList mensagens={listaDeMensagens} />

                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        
                        <TextField
                            value={mensagem}
                            onChange={(event) => {
                                const valor = event.target.value;
                                setMensagem(valor);
                            }}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter' && event.shiftKey == false) {
                                    event.preventDefault();
                                    handleNovaMensagem(mensagem);
                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginLeft: '12px',
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />

                        <ButtonSendSticker styleSheet={{
                            marginRight:'12px',
                            }}
                            // call back
                            onStickerClick={(sticker) => {
                                handleNovaMensagem(`:sticker: ${sticker}`)
                            }}
                        />

                        <Button 
                        styleSheet={{
                            marginLeft:'12px'
                        }}
                            onClick={() => {
                                handleNovaMensagem(mensagem)
                            }}
                            variant='primary'
                            colorVariant='dark'
                            label='Enviar'    
                        />

                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    //console.log(props);
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.mensagens.map((mensagem) => {
                return (
                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/${mensagem.de}.png`}
                            />
                            <Text tag="strong">
                                {mensagem.de}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>
                        </Box>
                        {mensagem.texto.startsWith(':sticker:') 
                            ? (
                                < Image
                                    styleSheet={{
                                        maxSize:'2px'
                                    }} 
                                    src={mensagem.texto.replace(':sticker:', '')}/>
                            )
                            : (
                                mensagem.texto   
                            )}
                       
                    </Text>
                );
            })}

        </Box>
    )
}