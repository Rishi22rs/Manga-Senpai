import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import TopBar from '../Components/TopBar';
import {ThemePalette, selectedTheme} from '../Theme/ThemePalette';
import AnimeCard from '../Components/AnimeCard';
import ActivityLoader from '../Components/ActivityLoader';
import {useTheme} from '@react-navigation/native';
import {searching} from '../Scraping/searching';
import cheerio from 'cheerio';

const dimension = Dimensions.get('window');

const Search = ({navigation, route}) => {
  const sampleData = [
    {
      id: '523',
      name: 'Tales of <span class="key">demon</span>s and Gods',
      nameunsigned: 'hyer5231574354229',
      lastchapter: 'Chapter 370.1',
      image: 'https://avt.mkklcdnv6temp.com/19/v/1-1583464475.jpg',
      author: 'Mad Snail',
      story_link: 'https://chap.mangairo.com/story-jg247414',
    },
    {
      id: '19214',
      name: 'Kimetsu no Yaiba',
      nameunsigned: 'kimetsu_no_yaiba',
      lastchapter: 'Chapter 205.5: Special One-Shot',
      image: 'https://avt.mkklcdnv6temp.com/30/e/13-1583488820.jpg',
      author: 'Gotouge Koyoharu',
      story_link: 'https://chap.mangairo.com/story-cx266105',
    },
    {
      id: '29610',
      name: 'My Wife is a <span class="key">demon</span> Queen',
      nameunsigned: 'wp918498',
      lastchapter: 'Chapter 348',
      image: 'https://avt.mkklcdnv6temp.com/47/y/17-1583496993.jpg',
      author: 'Rong Rong, Dw',
      story_link: 'https://chap.mangairo.com/story-mt276501',
    },
    {
      id: '32144',
      name: 'The Descent of the <span class="key">demon</span>ic Master',
      nameunsigned: 'ix921032',
      lastchapter: 'Chapter 129',
      image: 'https://avt.mkklcdnv6temp.com/41/a/19-1583500668.jpg',
      author: 'Wolbaek,mayolang',
      story_link: 'https://chap.mangairo.com/story-pb279035',
    },
    {
      id: '29459',
      name: 'Chronicles of Heavenly <span class="key">demon</span>',
      nameunsigned: 'fk918347',
      lastchapter: 'Chapter 165',
      image: 'https://avt.mkklcdnv6temp.com/42/s/17-1583496799.jpg',
      author: 'Il-Hwang, Gom-Guk',
      story_link: 'https://chap.mangairo.com/story-mq276350',
    },
    {
      id: '30287',
      name: 'Maou Gakuin no Futekigousha',
      nameunsigned: 'lj919175',
      lastchapter: 'Chapter 15.4',
      image: 'https://avt.mkklcdnv6temp.com/22/p/18-1583497982.jpg',
      author: 'Shuu',
      story_link: 'https://chap.mangairo.com/story-ns277178',
    },
    {
      id: '31045',
      name: 'The <span class="key">demon</span> King Who Lost His Job',
      nameunsigned: 'md919933',
      lastchapter: 'Chapter 262',
      image: 'https://avt.mkklcdnv6temp.com/50/m/19-1583499076.jpg',
      author: 'Tang Li Shui, Sf Qing Xiaoshuo, Ye Wu',
      story_link: 'https://chap.mangairo.com/story-oc277936',
    },
    {
      id: '1060',
      name: 'Maou no Hajimekata',
      nameunsigned: 'yjhu10601567132916',
      lastchapter: 'Chapter 45',
      image: 'https://avt.mkklcdnv6temp.com/38/o/1-1583465212.jpg',
      author: 'Warau Yakan, Komiya Toshimasa',
      story_link: 'https://chap.mangairo.com/story-tr247951',
    },
    {
      id: '28568',
      name: 'Supreme <span class="key">demon</span>',
      nameunsigned: 'supreme_demon',
      lastchapter: 'Chapter 185: Season 2 Announcement',
      image: 'https://avt.mkklcdnv6temp.com/9/s/17-1583495613.jpg',
      author: 'Leyou Yinghua',
      story_link: 'https://chap.mangairo.com/story-lz275459',
    },
    {
      id: '28885',
      name: 'Rise of The <span class="key">demon</span> King',
      nameunsigned: 'bi917773',
      lastchapter: 'Chapter 300',
      image: 'https://avt.mkklcdnv6temp.com/21/g/17-1583496023.jpg',
      author: 'Ai Lu Mao, Yao Ye, Qing Man',
      story_link: 'https://chap.mangairo.com/story-lq275776',
    },
    {
      id: '19254',
      name: '<span class="key">demon</span> Spirit Seed Manual',
      nameunsigned: 'demon_spirit_seed_manual',
      lastchapter: 'Chapter 287',
      image: 'https://avt.mkklcdnv6temp.com/30/r/13-1583488837.jpg',
      author: 'Dazui',
      story_link: 'https://chap.mangairo.com/story-cl266145',
    },
    {
      id: '28034',
      name: 'Maou ni Natta node, Dungeon Tsukutte Jingai Musume to Honobono suru',
      nameunsigned:
        'maou_ni_natta_node_dungeon_tsukutte_jingai_musume_to_honobono_suru',
      lastchapter: 'Chapter 42',
      image: 'https://avt.mkklcdnv6temp.com/39/s/16-1583494889.jpg',
      author: 'Tono Note, Ryuuyuu',
      story_link: 'https://h.mangairo.com/story-lr274925',
    },
    {
      id: '24294',
      name: 'Tondemo Skill de Isekai Hourou Meshi',
      nameunsigned: 'tondemo_skill_de_isekai_hourou_meshi',
      lastchapter: 'Chapter 48: Tenet',
      image: 'https://avt.mkklcdnv6temp.com/14/g/15-1583491974.jpg',
      author: 'Eguchi Ren, Masa',
      story_link: 'https://chap.mangairo.com/story-hz271185',
    },
    {
      id: '20110',
      name: 'Ane Naru Mono',
      nameunsigned: 'ane_naru_mono',
      lastchapter: 'Chapter 44',
      image: 'https://avt.mkklcdnv6temp.com/46/d/13-1583489448.jpg',
      author: 'Iida Pochi.',
      story_link: 'https://chap.mangairo.com/story-dt267001',
    },
    {
      id: '32152',
      name: 'I Was Born As The <span class="key">demon</span> Lord\'s Daughter',
      nameunsigned: 'mx921040',
      lastchapter: 'Chapter 140',
      image: 'https://avt.mkklcdnv6temp.com/41/i/19-1583500679.jpg',
      author: 'Inballo,garamgee,eunmin,yeul',
      story_link: 'https://chap.mangairo.com/story-pj279043',
    },
    {
      id: '340',
      name: 'Hataraku Maou-sama!',
      nameunsigned: 'hataraku_maousama',
      lastchapter: 'Chapter 101',
      image: 'https://avt.mkklcdnv6temp.com/13/u/1-1583464215.jpg',
      author: 'Wagahara Satoshi, Hiragi Akio',
      story_link: 'https://chap.mangairo.com/story-rx247231',
    },
    {
      id: '20568',
      name: 'Maou-jou de Oyasumi',
      nameunsigned: 'ccwc205681561861656',
      lastchapter:
        'Chapter 269: Versus, Demon King Castle Hot Pot B Set (Tajine)',
      image: 'https://avt.mkklcdnv6temp.com/4/i/14-1583489841.jpg',
      author: 'Kumanomata Kagiji',
      story_link: 'https://chap.mangairo.com/story-dz267459',
    },
    {
      id: '20919',
      name: 'For My Daughter, I Might Even Be Able to Defeat the <span class="key">demon</span> King',
      nameunsigned: 'fuiz209191571970520',
      lastchapter: 'Vol.6 Chapter 33.5',
      image: 'https://avt.mkklcdnv6temp.com/11/w/14-1583490167.jpg',
      author: 'Chirolu, Hota',
      story_link: 'https://chap.mangairo.com/story-dc267810',
    },
    {
      id: '27560',
      name: 'Maou no Ore ga Dorei Elf wo Yome ni Shitanda ga, Dou Medereba Ii?',
      nameunsigned:
        'maou_no_ore_ga_dorei_elf_wo_yome_ni_shitanda_ga_dou_medereba_ii',
      lastchapter: 'Chapter 41',
      image: 'https://avt.mkklcdnv6temp.com/21/v/16-1583494251.jpg',
      author: 'Teshima Fuminori',
      story_link: 'https://chap.mangairo.com/story-kr274451',
    },
    {
      id: '34329',
      name: 'A Breakthrough Brought by Forbidden Master and Disciple',
      nameunsigned: 'vy923217',
      lastchapter: 'Chapter 18 [End]',
      image: 'https://avt.mkklcdnv6temp.com/26/p/21-1592019882.jpg',
      author: 'Anikki Burazza,etou Yona',
      story_link: 'https://chap.mangairo.com/story-rm281220',
    },
  ];
  const [keyword, setKeyword] = useState();
  const [animeList, setAnimeList] = useState();
  const searchRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      searchRef.current.focus();
    });

    return unsubscribe;
  }, [navigation]);
  let searchTimeoutToken = 0;
  const searchAnime = e => {
    setIsLoading(true);
    setKeyword(e);
    if (e.length > 3) {
      let formData = new FormData();
      formData.append('searchword', e);
      clearInterval(searchTimeoutToken);
      if (e.length >= 3) {
        searchTimeoutToken = setTimeout(() => {
          fetch('https://chap.mangairo.com/getsearchstory', {
            method: 'post',
            body: formData,
          })
            .then(res => res.text())
            .then(text => {
              setAnimeList(JSON.parse(text));
              setIsLoading(false);
            });
        }, 500);
      }
    }
  };

  console.log('animeList', animeList);

  const {colors} = useTheme();

  const extractName = title => {
    const $ = cheerio.load(title);
    return $.text();
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <TopBar />
      <SearchBar
        placeholder="Start searching..."
        onChangeText={searchAnime}
        value={keyword}
        lightTheme={true}
        containerStyle={[
          styles.containerStyle,
          styles.searchHeight,
          {
            backgroundColor: colors.background,
            borderBottomColor: colors.background,
          },
        ]}
        inputContainerStyle={[
          styles.containerStyle,
          styles.searchHeight,
          {backgroundColor: colors.background},
        ]}
        ref={searchRef}
        // onSubmitEditing={searchAnime}
      />
      <View style={styles.searchContainer}>
        {animeList ? (
          <>
            {animeList?.searchlist?.length > 0 ? (
              <FlatList
                style={{height: dimension.height - 165}}
                data={animeList.searchlist}
                renderItem={({item}) => (
                  <AnimeCard
                    // title={item.name}
                    // banner={item.banner}
                    // detail={item.releaseDate}
                    // animeLink={item.animeLink}
                    // navigation={navigation}
                    title={extractName(item.name)}
                    banner={item.image}
                    detail={item.lastchapter}
                    animeLink={item.story_link}
                    navigation={navigation}
                  />
                )}
                numColumns={2}
              />
            ) : (
              <Text
                style={{
                  textAlign: 'center',
                  color: colors['titleColor']['orange'],
                }}>
                {`Sorry, Not found Manga with that keyword.`}.
              </Text>
            )}
          </>
        ) : (
          isLoading && <ActivityLoader />
        )}
      </View>
      {/* <View>
        <View>
          <FlatList
            style={{height: dimension.height - 165}}
            data={[sampleData, sampleData]}
            renderItem={({item}) => (
              <AnimeCard
                title={extractName(item.name)}
                banner={item.image}
                detail={item.lastchapter}
                animeLink={item.animeLink}
                navigation={navigation}
              />
            )}
            numColumns={2}
          />
        </View>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: dimension.height,
  },
  containerStyle: {
    borderBottomWidth: 0.5,
    // borderBottomColor: '#dbdbdb',
    borderTopWidth: 0,
  },
  searchHeight: {
    height: 20,
  },
  searchContainer: {
    marginTop: 20,
  },
});

export default Search;
