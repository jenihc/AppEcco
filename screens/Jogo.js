import React, { useState, useEffect, useRef } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Modal,
    Pressable,
} from 'react-native';
import lixos from '../screens/lixos.json';



const { width } = Dimensions.get('window');
const PATH_WIDTH = Math.round(width * 0.55);
const MAX_HEARTS = 5;

const imagensLixos = {
    // Plástico
    "gaPET.png": require('../assets/gaPET.png'),
    "sacola.png": require('../assets/sacola.png'),
    "copp.png": require('../assets/copp.png'),
    "can.png": require('../assets/can.png'),
    "tamp.png": require('../assets/tamp.png'),
    "gal.png": require('../assets/gal.png'),
  
    // Metal
    "LAT.png": require('../assets/LAT.png'),
    "LAC.png": require('../assets/LAC.png'),
    "lata.png": require('../assets/lata.png'),
    "mol.png": require('../assets/mol.png'),
    "tal.png": require('../assets/tal.png'),
    "clip.png": require('../assets/clip.png'),
  
    // Papel
    "papelao.png": require('../assets/papelao.png'),
    "papel.png": require('../assets/papel.png'),
    "coppp.png": require('../assets/coppp.png'),
    "pps.png": require('../assets/pps.png'),
    "cax.png": require('../assets/cax.png'),
    "jor.png": require('../assets/jor.png'),
    "bol.png": require('../assets/bol.png'),
  
    // Vidro
    "vidro.png": require('../assets/vidro.png'),
    "frasco.png": require('../assets/frasco.png'),
    "cop.png": require('../assets/cop.png'),
    "caco.png": require('../assets/caco.png'),
    "esp.png": require('../assets/esp.png'),
  
    // Orgânico
    "mac.png": require('../assets/mac.png'),
    "lar.png": require('../assets/lar.png'),
    "tom.png": require('../assets/tom.png'),
    "pex.png": require('../assets/pex.png'),
    "ovo.png": require('../assets/ovo.png'),
    "mel.png": require('../assets/mel.png'),
    "fol.png": require('../assets/fol.png'),
    "cen.png": require('../assets/cen.png'),
    "bro.png": require('../assets/bro.png'),
    "ban.png": require('../assets/ban.png'),
  
    // Não Reciclável
    "vac.png": require('../assets/vac.png'),
    "fra.png": require('../assets/fra.png'),
    "buch.png": require('../assets/buch.png'),
    "cig.png": require('../assets/cig.png'),
    "esc.png": require('../assets/esc.png'),
    "iso.png": require('../assets/iso.png'),
    "mas.png": require('../assets/mas.png'),
    "pilha.png": require('../assets/pilha.png'),
    "fita.png": require('../assets/fita.png'),
  

    // Adicione aqui os assets para orgânico e não reciclável se você tiver
};

const spritesPersonagem = [
    require('../assets/spri1.png'),
    require('../assets/spri2.png'),
    require('../assets/spri3.png'),
    require('../assets/spri4.png'),
];

const starImg = require('../assets/ft1.png');
const heartImg = require('../assets/ft.png');

const SPRITE_WIDTH = 160;
const SPRITE_HEIGHT = 160;
const LIXO_SIZE = 50;

// Hitbox mais estreita e baixa
const HITBOX_WIDTH = SPRITE_WIDTH * 0.5;
const HITBOX_HEIGHT = SPRITE_HEIGHT * 0.3;

const EXTRA_MARGIN = 60;
const SPRITE_BOTTOM_OFFSET = 120;
const TOPBAR_PADDING_TOP = 50;
const TOPBAR_MARGIN_BOTTOM = 16;

// Cores por categoria (agora com todas as 6)
const categoriaCores = {
    'Papel': '#2196F3',
    'Plastico': '#38b6ff',
    'Metal': '#FF9800',
    'Vidro': '#4CAF50',
    'Orgânico': '#6d4224',
    'Não Reciclavel': '#9E9E9E',
};

export default function Jogo({ route, navigation }) {
    const { tipo: categoriaSelecionada } = route.params;
    const [lixosAtivos, setLixosAtivos] = useState([]);
    const [posicaoSprite, setPosicaoSprite] = useState(PATH_WIDTH / 2 - SPRITE_WIDTH / 2);
    const [indiceSprite, setIndiceSprite] = useState(0);
    const [pathLayout, setPathLayout] = useState(null);
    const [pontos, setPontos] = useState(0);
    const [vidas, setVidas] = useState(5);
    const [modalVisible, setModalVisible] = useState(false);
    const gameOverRef = useRef(false);

    // Animação do sprite (spri1 por mais tempo)
    useEffect(() => {
        let inicial = true;
        let seqInicial = [0, 1, 2, 3];
        let seqLoop = [2, 3];
        let currentIndex = 0;

        const intervalo = setInterval(() => {
            if (inicial) {
                setIndiceSprite(seqInicial[currentIndex]);
                currentIndex++;
                if (currentIndex === 1) {
                    clearInterval(intervalo);
                    setTimeout(() => {
                        let loopIndex = 0;
                        const loopInterval = setInterval(() => {
                            setIndiceSprite(seqLoop[loopIndex]);
                            loopIndex = (loopIndex + 1) % 2;
                        }, 150);
                    }, 500);
                }
                if (currentIndex >= seqInicial.length) {
                    inicial = false;
                    currentIndex = 0;
                }
            }
        }, 150);

        return () => clearInterval(intervalo);
    }, []);

    // Gerar lixos
    useEffect(() => {
        if (!pathLayout || vidas <= 0) return;
        const intervalo = setInterval(() => {
            const lixosDaCategoria = lixos[categoriaSelecionada] || [];
            if (!lixosDaCategoria.length) return;
            const randomLixo = lixosDaCategoria[Math.floor(Math.random() * lixosDaCategoria.length)];
            const posicaoX = Math.random() * Math.max(pathLayout.width - LIXO_SIZE, 0);
            setLixosAtivos(prev => [...prev, { ...randomLixo, x: posicaoX, y: 0, coletado: false }]);
        }, 1200);
        return () => clearInterval(intervalo);
    }, [categoriaSelecionada, pathLayout, vidas]);

    // Movimento e colisão
    useEffect(() => {
        if (!pathLayout || vidas <= 0) return;
        const intervalo = setInterval(() => {
            setLixosAtivos(prev => {
                const novos = [];
                const spriteLeft = posicaoSprite + (SPRITE_WIDTH - HITBOX_WIDTH) / 2;
                const spriteRight = spriteLeft + HITBOX_WIDTH;
                const spriteTop = pathLayout.height - HITBOX_HEIGHT - SPRITE_BOTTOM_OFFSET;
                const spriteBottom = spriteTop + HITBOX_HEIGHT;

                prev.forEach(lixo => {
                    const newY = lixo.y + 5;
                    const lixoBottom = newY + LIXO_SIZE;
                    const lixoRight = lixo.x + LIXO_SIZE;

                    const colisao =
                        lixo.x < spriteRight &&
                        lixoRight > spriteLeft &&
                        newY < spriteBottom &&
                        lixoBottom > spriteTop;

                    if (colisao) {
                        setPontos(p => p + 1);
                    } else if (lixoBottom >= pathLayout.height) {
                        setVidas(v => {
                            const nv = Math.max(v - 1, 0);
                            if (nv === 0 && !gameOverRef.current) {
                                gameOverRef.current = true;
                                setModalVisible(true);
                            }
                            return nv;
                        });
                    } else {
                        novos.push({ ...lixo, y: newY });
                    }
                });
                return novos;
            });
        }, 50);
        return () => clearInterval(intervalo);
    }, [pathLayout, posicaoSprite, vidas]);

    const moverDireita = () =>
        setPosicaoSprite(prev => Math.min(prev + 40, PATH_WIDTH - SPRITE_WIDTH + EXTRA_MARGIN));
    const moverEsquerda = () => setPosicaoSprite(prev => Math.max(prev - 40, -EXTRA_MARGIN));

    // cor da categoria
    const faixaColor = categoriaCores[categoriaSelecionada] || '#9E9E9E';

    return (
        <SafeAreaView style={styles.container}>
            <View style={[styles.topBar, { paddingTop: TOPBAR_PADDING_TOP, marginBottom: TOPBAR_MARGIN_BOTTOM }]}>
                <View style={styles.starBox}>
                    <Image source={starImg} style={styles.starIcon} />
                    <Text style={styles.starCount}>{pontos}</Text>
                </View>
                <View style={styles.heartsBox}>
                    {Array.from({ length: MAX_HEARTS }).map((_, i) => (
                        <Image
                            key={i}
                            source={heartImg}
                            style={[styles.heartIcon, { opacity: i >= MAX_HEARTS - vidas ? 1 : 0.25 }]}
                        />
                    ))}
                </View>
            </View>

            <View style={[styles.categoriaBox, { backgroundColor: faixaColor }]}>
                <Text style={styles.categoriaTexto}>{categoriaSelecionada}</Text>
            </View>

            <View style={styles.gameArea}>
                <View style={styles.leftFoliage} />
                <View style={styles.path} onLayout={e => setPathLayout(e.nativeEvent.layout)}>
                    {lixosAtivos.map((lixo, idx) => (
                        <Image
                            key={idx}
                            source={imagensLixos[lixo.imagem]}
                            style={[styles.lixoImagem, { left: lixo.x, top: lixo.y }]}
                            resizeMode="contain"
                        />
                    ))}
                    <Image
                        source={spritesPersonagem[indiceSprite]}
                        style={[styles.sprite, { left: posicaoSprite }]}
                        resizeMode="contain"
                    />
                </View>
                <View style={styles.rightFoliage} />
            </View>

            <View style={styles.controls}>
                <TouchableOpacity style={styles.button} onPress={moverEsquerda}>
                    <Image source={require('../assets/esquer.png')} style={styles.arrowIcon} resizeMode="cover" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={moverDireita}>
                    <Image source={require('../assets/direita.png')} style={styles.arrowIcon} resizeMode="cover" />
                </TouchableOpacity>
            </View>

            {/* Modal de Fim de Jogo */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>FIM DE JOGO!</Text>
                        <Image source={require('../assets/ft1.png')} style={styles.modalStarIcon} />
                        <Text style={styles.modalText}>Você coletou {pontos} pontos!</Text>
                        <Pressable
                            style={[styles.modalButton, styles.buttonClose]}
                            onPress={() => {
                                setModalVisible(!modalVisible);
                                navigation.goBack(); // Volta para a tela anterior
                            }}>
                            <Text style={styles.textStyle}>Reiniciar</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#8BC34A' },
    topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20 },
    starBox: { flexDirection: 'row', alignItems: 'center' },
    starIcon: { width: 34, height: 34, marginRight: 8 },
    starCount: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
    heartsBox: { flexDirection: 'row', alignItems: 'center' },
    heartIcon: { width: 28, height: 28, marginLeft: 6 },
    categoriaBox: { marginHorizontal: 20, paddingVertical: 8, borderRadius: 12 },
    categoriaTexto: { textAlign: 'center', fontSize: 24, fontWeight: 'bold', color: '#fff' },
    gameArea: { flex: 1, flexDirection: 'row', marginTop: 6 },
    leftFoliage: { flex: 1, backgroundColor: '#689F38' },
    path: { width: PATH_WIDTH, height: '100%', backgroundColor: '#F5DEB3', position: 'relative' },
    rightFoliage: { flex: 1, backgroundColor: '#689F38' },
    controls: { flexDirection: 'row', justifyContent: 'space-around', padding: 20, marginBottom: 24 },
    button: { width: 70, height: 70, backgroundColor: '#FFD600', borderRadius: 50, alignItems: 'center', justifyContent: 'center', marginBottom: '20' },
    arrowIcon: { width: 70, height: 70, borderRadius: 50 },
    lixoImagem: { width: LIXO_SIZE, height: LIXO_SIZE, position: 'absolute', zIndex: 5 },
    sprite: { position: 'absolute', bottom: SPRITE_BOTTOM_OFFSET, width: SPRITE_WIDTH, height: SPRITE_HEIGHT, zIndex: 10 },

    // Estilos do Modal
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    modalView: {
        margin: 30,
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 45,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFD604',
        marginBottom: 15,
    },
    modalStarIcon: {
        width: 60,
        height: 60,
        marginVertical: 10,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 20,
    },
    modalButton: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: 15,
        paddingHorizontal: 20,
    },
    buttonClose: {
        backgroundColor: '#5f7f22',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});