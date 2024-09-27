import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import {
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { ProfileInfo, Thread } from '../../components'
import theme from '../../constants/theme'
import { useLanguage, useTheme } from '../../contexts'
import { getSafeAreaTop, hp, wp } from '../../utils'

const ProfileScreen = () => {
    const dispatch = useDispatch()
    const { currentColors } = useTheme()
    const { t } = useLanguage()

    const loading = useSelector(state => state.loading)

    const [selectedTab, setSelectedTab] = useState('thread')

    const renderThreadList = data => (
        <FlatList
            data={data}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
                <Thread
                    username={item.username}
                    time={item.time}
                    text={item.text}
                    images={item.images}
                    likes={item.likes}
                    comments={item.comments}
                    shares={item.shares}
                    send={item.send}
                    avatar={item.avatar}
                />
            )}
            showsVerticalScrollIndicator={false}
        />
    )

    const renderContent = () => {
        return selectedTab === 'thread'
            ? renderThreadList(threadData)
            : renderThreadList(repostsData)
    }

    const repostsData = [
        {
            id: 1,
            username: 'phanhisimee',
            time: '17h',
            text: 'Nhà Sài Gòn, có lẽ, những ô nhà nhỏ xíu chạy dọc từng con phố cũ...',
            images: [
                'https://instagram.fdad1-3.fna.fbcdn.net/v/t51.29350-15/461178082_1063825938479135_851355484728208934_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE3ODQuc2RyLmYyOTM1MC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=instagram.fdad1-3.fna.fbcdn.net&_nc_cat=111&_nc_ohc=bQPtresdJS8Q7kNvgGTOQT0&_nc_gid=2042c0a1e0bb47689d9a88fec105cae7&edm=AAGeoI8BAAAA&ccb=7-5&ig_cache_key=MzQ2MzUwODEyMzM0NjM2Mjg4Mw%3D%3D.3-ccb7-5&oh=00_AYBLQiD82Mmx-TPE5jQnYDVCvdhgUCKFLoxlMZgz5IagRA&oe=66FB4761&_nc_sid=b0e1a0',
                'https://instagram.fdad2-1.fna.fbcdn.net/v/t51.29350-15/461165272_868462778582365_7390831344472202738_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE3ODQuc2RyLmYyOTM1MC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=instagram.fdad2-1.fna.fbcdn.net&_nc_cat=101&_nc_ohc=M-WVwX9FppsQ7kNvgG0_abH&_nc_gid=2042c0a1e0bb47689d9a88fec105cae7&edm=AAGeoI8BAAAA&ccb=7-5&ig_cache_key=MzQ2MzUwODEyMzM4ODI3NTAxMg%3D%3D.3-ccb7-5&oh=00_AYCkxxKBJSk3mO3fNqLMaIbDo_GzoxUEIpmjTKi534kCFA&oe=66FB4359&_nc_sid=b0e1a0',
                'https://instagram.fdad1-4.fna.fbcdn.net/v/t51.29350-15/461152004_838222478510885_6788902611582996240_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE3ODQuc2RyLmYyOTM1MC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=instagram.fdad1-4.fna.fbcdn.net&_nc_cat=105&_nc_ohc=82SkxIFoTAAQ7kNvgGZkIvV&_nc_gid=2042c0a1e0bb47689d9a88fec105cae7&edm=AAGeoI8BAAAA&ccb=7-5&ig_cache_key=MzQ2MzUwODEyMzM5Njg0NDM0MA%3D%3D.3-ccb7-5&oh=00_AYCdXq5UaLj0XSFQTCwHytjJtjVwaRx1mUxgzhn1jD782A&oe=66FB386A&_nc_sid=b0e1a0',
                'https://instagram.fdad2-1.fna.fbcdn.net/v/t51.29350-15/461145359_1848401802354421_4089018949289240315_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE3ODQuc2RyLmYyOTM1MC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=instagram.fdad2-1.fna.fbcdn.net&_nc_cat=101&_nc_ohc=jOVQc7-_Lj8Q7kNvgFcDmub&_nc_gid=2042c0a1e0bb47689d9a88fec105cae7&edm=AAGeoI8BAAAA&ccb=7-5&ig_cache_key=MzQ2MzUwODEyMzMzNzg4NzA4Nw%3D%3D.3-ccb7-5&oh=00_AYA_PliT8l8Hs0T_aIV4Y2heLQ1KHkv7BelrTG06_Vt8iA&oe=66FB63FD&_nc_sid=b0e1a0',
                'https://instagram.fdad1-4.fna.fbcdn.net/v/t51.29350-15/461047696_406198102222347_4910223118330634491_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE3ODQuc2RyLmYyOTM1MC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=instagram.fdad1-4.fna.fbcdn.net&_nc_cat=103&_nc_ohc=0EqNJB7Wt28Q7kNvgGHGkFr&_nc_gid=2042c0a1e0bb47689d9a88fec105cae7&edm=AAGeoI8BAAAA&ccb=7-5&ig_cache_key=MzQ2MzUwODEyMzIwMzgxMjY2NA%3D%3D.3-ccb7-5&oh=00_AYC7aLwGFT6gB9gvKx7bDBPzk0X7JAWOcNJIEh5CsAQAbA&oe=66FB459C&_nc_sid=b0e1a0',
                'https://instagram.fdad1-4.fna.fbcdn.net/v/t51.29350-15/461150980_1170063884067924_3726234818307733938_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE3ODQuc2RyLmYyOTM1MC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=instagram.fdad1-4.fna.fbcdn.net&_nc_cat=100&_nc_ohc=n0JSsW3Gx9kQ7kNvgGBUBsM&edm=AAGeoI8BAAAA&ccb=7-5&ig_cache_key=MzQ2MzUwODEyMzQzMDE5ODE0NQ%3D%3D.3-ccb7-5&oh=00_AYAXwq-5qYX45ZjnJyoUIuWo_HoD79kYAWghx_f5ja69fA&oe=66FB32B3&_nc_sid=b0e1a0'
            ],
            likes: 70,
            comments: 4,
            shares: 3,
            send: 9,
            avatar: 'https://instagram.fdad1-4.fna.fbcdn.net/v/t51.2885-19/358247890_1428932441260169_3807042156024317727_n.jpg?stp=dst-jpg_s640x640&_nc_ht=instagram.fdad1-4.fna.fbcdn.net&_nc_cat=105&_nc_ohc=uMAOFIAAvnYQ7kNvgEpU04R&edm=AAZTMJEBAAAA&ccb=7-5&oh=00_AYCZ-1id35rigtZPPCs6JLUFbGiyhGsVvVMY8GfIE8glZg&oe=66FB4544&_nc_sid=49cb7f'
        },
        {
            id: 2,
            username: '03.nmt',
            time: '2h',
            text: 'Một Mùa Trăng, điều kì diệu của Thread: lấy tay kéo ảnh lại gần nhau ✨',
            images: [
                'https://instagram.fdad1-3.fna.fbcdn.net/v/t51.29350-15/460236714_446083244484946_2349192072481091009_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMDgxeDE0NDAuc2RyLmYyOTM1MC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=instagram.fdad1-3.fna.fbcdn.net&_nc_cat=110&_nc_ohc=uWlO7fdPUv4Q7kNvgEicv7S&_nc_gid=786df6d7a1f44db29e21f4c69f3ed342&edm=ALvRx_oBAAAA&ccb=7-5&ig_cache_key=MzQ1ODk3MDE4Njg0NzkyODA4OA%3D%3D.3-ccb7-5&oh=00_AYB3Nwup5ZYpNG_r23qX131vA9tk89pmDo4GSexzAKdHog&oe=66FB6C62&_nc_sid=ecb15b',
                'https://instagram.fdad1-4.fna.fbcdn.net/v/t51.29350-15/460436971_461524393595499_1176992366809092480_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMDc5eDE0NDAuc2RyLmYyOTM1MC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=instagram.fdad1-4.fna.fbcdn.net&_nc_cat=103&_nc_ohc=HlNtWZ5q6FcQ7kNvgEjQbVv&_nc_gid=786df6d7a1f44db29e21f4c69f3ed342&edm=ALvRx_oBAAAA&ccb=7-5&ig_cache_key=MzQ1ODk3MDE4Njg0Nzg4NDk1MA%3D%3D.3-ccb7-5&oh=00_AYDHL7OC3JyZyZq5_0EA3mB83e-Y_FRfOIziZ6dTtu1pQQ&oe=66FB436F&_nc_sid=ecb15b',
                'https://instagram.fdad1-3.fna.fbcdn.net/v/t51.29350-15/460143317_913712487256042_7224540816386740541_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMDc5eDE0NDAuc2RyLmYyOTM1MC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=instagram.fdad1-3.fna.fbcdn.net&_nc_cat=110&_nc_ohc=VFmgNbF_nuMQ7kNvgG8Cbya&_nc_gid=786df6d7a1f44db29e21f4c69f3ed342&edm=ALvRx_oBAAAA&ccb=7-5&ig_cache_key=MzQ1ODk3MDE4Njc3MjU4Nzg3OQ%3D%3D.3-ccb7-5&oh=00_AYDKJkpTpZ8YIdk4l9PMgkZaOiSJgWYbXHruguQw9kwiEA&oe=66FB4AED&_nc_sid=ecb15b',
                'https://instagram.fdad1-2.fna.fbcdn.net/v/t51.29350-15/460342901_1226229318813570_4499258883419089977_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMDgxeDE0NDAuc2RyLmYyOTM1MC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=instagram.fdad1-2.fna.fbcdn.net&_nc_cat=106&_nc_ohc=oksAoMWPq-AQ7kNvgH1huKT&edm=ALvRx_oBAAAA&ccb=7-5&ig_cache_key=MzQ1ODk3MDE4Njg0Nzg4OTgxNQ%3D%3D.3-ccb7-5&oh=00_AYBB8JWXy4EjJGnBSh9OFhBCmMkRn0hmkJ8NDQQRIkOM0A&oe=66FB4ED4&_nc_sid=ecb15b'
            ],
            likes: 55,
            comments: 10,
            shares: 1,
            send: 5,
            avatar: 'https://instagram.fdad2-1.fna.fbcdn.net/v/t51.2885-19/370611718_190012080634808_4812977847151989586_n.jpg?stp=dst-jpg_s640x640&_nc_ht=instagram.fdad2-1.fna.fbcdn.net&_nc_cat=108&_nc_ohc=hTPr3rC81_0Q7kNvgF3fqSh&_nc_gid=3464d88a8d7e47568ddde17d352069cf&edm=AAZTMJEBAAAA&ccb=7-5&oh=00_AYAkyjMlwInFQDQB-mtG_kG1ly9QTJMquuXc3aAdaEBZkA&oe=66FB6B38&_nc_sid=49cb7f'
        },
        {
            id: 3,
            username: 'dicaphe',
            time: '14h',
            text: 'Đà Nẵng mà cữ ngờ miền tây sông nước 😌',
            images: [
                'https://instagram.fdad2-1.fna.fbcdn.net/v/t51.29350-15/461282913_2363532243817057_5539052989055603353_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMDgweDcyMC5zZHIuZjI5MzUwLmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=instagram.fdad2-1.fna.fbcdn.net&_nc_cat=101&_nc_ohc=883J1tDQY1EQ7kNvgGB-G2K&_nc_gid=5c0485ece63941eeafee93e81de937c5&edm=AHedtMEBAAAA&ccb=7-5&ig_cache_key=MzQ2NTI3NjAwMDM2MjY3NjU3Nw%3D%3D.3-ccb7-5&oh=00_AYCoKAuy-7oPFGk--oG1fwXAI9-LAKJl-qyFukBOGQp_kg&oe=66FB57B5&_nc_sid=a3cc6e'
            ],
            likes: 51,
            comments: 2,
            shares: 1,
            send: 4,
            avatar: 'https://instagram.fdad2-1.fna.fbcdn.net/v/t51.2885-19/370611718_190012080634808_4812977847151989586_n.jpg?stp=dst-jpg_s640x640&_nc_ht=instagram.fdad2-1.fna.fbcdn.net&_nc_cat=108&_nc_ohc=hTPr3rC81_0Q7kNvgF3fqSh&_nc_gid=3464d88a8d7e47568ddde17d352069cf&edm=AAZTMJEBAAAA&ccb=7-5&oh=00_AYAkyjMlwInFQDQB-mtG_kG1ly9QTJMquuXc3aAdaEBZkA&oe=66FB6B38&_nc_sid=49cb7f'
        }
    ]

    const threadData = [
        {
            id: 1,
            username: '03.nmt',
            time: '17h',
            text: 'Google Sheets không phế, tôi phế (1) Cách để rút ngắn thời gian giải quyết vấn đề ở mọi lĩnh vực trong công việc, học tập,… nhanh nhất là dùng công cụ bổ trợ.',
            images: [
                'https://instagram.fdad2-1.fna.fbcdn.net/v/t51.29350-15/461418021_1167534651009613_1131774075551151828_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE5MjAuc2RyLmYyOTM1MC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=instagram.fdad2-1.fna.fbcdn.net&_nc_cat=101&_nc_ohc=3J4M95CWhtwQ7kNvgHO_YJ3&_nc_gid=c7592133579d4215a21768be444c65b1&edm=APfQFzwBAAAA&ccb=7-5&ig_cache_key=MzQ2NjMxOTgwMDUyMjEyMDkzNQ%3D%3D.3-ccb7-5&oh=00_AYBmbBRdV5q1Hi4uMe5MXkpCGGoTzCYmQYSslFIrvidI_g&oe=66FC931F&_nc_sid=b31082',
                'https://instagram.fdad1-4.fna.fbcdn.net/v/t51.29350-15/461536638_1293056278739873_2749932852590519013_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE5MjAuc2RyLmYyOTM1MC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=instagram.fdad1-4.fna.fbcdn.net&_nc_cat=105&_nc_ohc=KhlQLljw2fUQ7kNvgF5dTS4&_nc_gid=c7592133579d4215a21768be444c65b1&edm=APfQFzwBAAAA&ccb=7-5&ig_cache_key=MzQ2NjMxOTgwMDM4NzgyNzIyNA%3D%3D.3-ccb7-5&oh=00_AYDEy73YvwfKdhRBmZQZfqA8R6NiE_LrTfM9oVgRZPitfw&oe=66FC9D48&_nc_sid=b31082',
                'https://instagram.fdad1-2.fna.fbcdn.net/v/t51.29350-15/461450264_2211964522522974_4790087417762143238_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE5MjAuc2RyLmYyOTM1MC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=instagram.fdad1-2.fna.fbcdn.net&_nc_cat=106&_nc_ohc=xvTn12rAxjMQ7kNvgHMSEq2&_nc_gid=c7592133579d4215a21768be444c65b1&edm=APfQFzwBAAAA&ccb=7-5&ig_cache_key=MzQ2NjMxOTgwMDM3OTQ5MzE3MQ%3D%3D.3-ccb7-5&oh=00_AYD9DMfBj6gSk7fha5HvxZMf6EXGN2o01xrly1aK2r0RbA&oe=66FC8FFC&_nc_sid=b31082',
                'https://instagram.fdad1-3.fna.fbcdn.net/v/t51.29350-15/461442530_1058324272518850_6943464951329246026_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE5MjAuc2RyLmYyOTM1MC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=instagram.fdad1-3.fna.fbcdn.net&_nc_cat=110&_nc_ohc=TTPp23A62F8Q7kNvgGAzcjQ&_nc_gid=c7592133579d4215a21768be444c65b1&edm=APfQFzwBAAAA&ccb=7-5&ig_cache_key=MzQ2NjMxOTgwMDM2MjYxMTc3Nw%3D%3D.3-ccb7-5&oh=00_AYAandDgcn_HVUOnvc1BEoTwCNJ3C4mVFgUAU4rXTpsHAg&oe=66FCA223&_nc_sid=b31082',
                'https://instagram.fdad1-4.fna.fbcdn.net/v/t51.29350-15/461442396_449612371428924_6156203422943099533_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE5MjAuc2RyLmYyOTM1MC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=instagram.fdad1-4.fna.fbcdn.net&_nc_cat=100&_nc_ohc=bD29wYHERAAQ7kNvgEgycT1&_nc_gid=c7592133579d4215a21768be444c65b1&edm=APfQFzwBAAAA&ccb=7-5&ig_cache_key=MzQ2NjMxOTgwMDM3OTYyMjk1NA%3D%3D.3-ccb7-5&oh=00_AYBmdufPKdifCv0edSeIEbwpEz7oMcXyD-G9N09rOICGbw&oe=66FCA6C6&_nc_sid=b31082'
            ],
            likes: 70,
            comments: 4,
            shares: 3,
            send: 9,
            avatar: 'https://instagram.fdad2-1.fna.fbcdn.net/v/t51.2885-19/370611718_190012080634808_4812977847151989586_n.jpg?stp=dst-jpg_s640x640&_nc_ht=instagram.fdad2-1.fna.fbcdn.net&_nc_cat=108&_nc_ohc=hTPr3rC81_0Q7kNvgF3fqSh&_nc_gid=fbc9850359ee4a38b0bbac7b5e82adef&edm=AAZTMJEBAAAA&ccb=7-5&oh=00_AYDjoO6_62x_Pe0DWhaCsS0StYclQFtRt6Pg1jiZShMXgw&oe=66FCBCB8&_nc_sid=49cb7f'
        },
        {
            id: 2,
            username: '03.nmt',
            time: '1h',
            text: 'Mai t đi r, không biết ai như t ko chớ nếu lâu không về thì sẽ rất bth, t cũng sẽ chẳng nhớ nhà hay chi cả. Nhưng mà nếu đã về rồi thì t lại bị quyến luyến, không muốn đi nữa á. Mẹ t từ tối ni đã bắt đầu đỏ hoe cả mắt, t cũng không biết làm răng nữa. Mặc dù tối ni người t uể oải vl, mà t không cách mô ngủ được, nghĩ tới là lại buồn vl. Mặc dù t chỉ đi 1 tháng rưỡi rồi t lại ra nghỉ hè, mà t đã ri rồi, mà nghĩ đến cảnh sau ni t đi 1 2 năm mới về một lần nữa thì t kh biết mẹ t răng luôn á 😥  ',
            images: [],
            likes: 120,
            comments: 10,
            shares: 5,
            send: 15,
            avatar: 'https://instagram.fdad2-1.fna.fbcdn.net/v/t51.2885-19/370611718_190012080634808_4812977847151989586_n.jpg?stp=dst-jpg_s640x640&_nc_ht=instagram.fdad2-1.fna.fbcdn.net&_nc_cat=108&_nc_ohc=hTPr3rC81_0Q7kNvgF3fqSh&_nc_gid=fbc9850359ee4a38b0bbac7b5e82adef&edm=AAZTMJEBAAAA&ccb=7-5&oh=00_AYDjoO6_62x_Pe0DWhaCsS0StYclQFtRt6Pg1jiZShMXgw&oe=66FCBCB8&_nc_sid=49cb7f'
        },
        {
            id: 3,
            username: '03.nmt',
            time: '2h',
            text: 'Ngắm hoàng hôn ở phố cổ Hội An, một trải nghiệm không thể quên.',
            images: [],
            likes: 200,
            comments: 15,
            shares: 8,
            send: 20,
            avatar: 'https://instagram.fdad2-1.fna.fbcdn.net/v/t51.2885-19/370611718_190012080634808_4812977847151989586_n.jpg?stp=dst-jpg_s640x640&_nc_ht=instagram.fdad2-1.fna.fbcdn.net&_nc_cat=108&_nc_ohc=hTPr3rC81_0Q7kNvgF3fqSh&_nc_gid=fbc9850359ee4a38b0bbac7b5e82adef&edm=AAZTMJEBAAAA&ccb=7-5&oh=00_AYDjoO6_62x_Pe0DWhaCsS0StYclQFtRt6Pg1jiZShMXgw&oe=66FCBCB8&_nc_sid=49cb7f'
        },
        {
            id: 4,
            username: '03.nmt',
            time: '3h',
            text: 'Khám phá ẩm thực đường phố tại Hà Nội, nơi có những món ăn ngon nhất!',
            images: [],
            likes: 150,
            comments: 8,
            shares: 4,
            send: 12,
            avatar: 'https://instagram.fdad2-1.fna.fbcdn.net/v/t51.2885-19/370611718_190012080634808_4812977847151989586_n.jpg?stp=dst-jpg_s640x640&_nc_ht=instagram.fdad2-1.fna.fbcdn.net&_nc_cat=108&_nc_ohc=hTPr3rC81_0Q7kNvgF3fqSh&_nc_gid=fbc9850359ee4a38b0bbac7b5e82adef&edm=AAZTMJEBAAAA&ccb=7-5&oh=00_AYDjoO6_62x_Pe0DWhaCsS0StYclQFtRt6Pg1jiZShMXgw&oe=66FCBCB8&_nc_sid=49cb7f'
        },
        {
            id: 5,
            username: '03.nmt',
            time: '5h',
            text: 'Chuyến đi đến Đà Lạt, nơi có những cánh hoa rực rỡ.',
            images: [],
            likes: 180,
            comments: 12,
            shares: 6,
            send: 14,
            avatar: 'https://instagram.fdad2-1.fna.fbcdn.net/v/t51.2885-19/370611718_190012080634808_4812977847151989586_n.jpg?stp=dst-jpg_s640x640&_nc_ht=instagram.fdad2-1.fna.fbcdn.net&_nc_cat=108&_nc_ohc=hTPr3rC81_0Q7kNvgF3fqSh&_nc_gid=fbc9850359ee4a38b0bbac7b5e82adef&edm=AAZTMJEBAAAA&ccb=7-5&oh=00_AYDjoO6_62x_Pe0DWhaCsS0StYclQFtRt6Pg1jiZShMXgw&oe=66FCBCB8&_nc_sid=49cb7f'
        }
    ]

    return (
        <FlatList
            style={{
                backgroundColor: currentColors.background,
                marginTop: getSafeAreaTop()
            }}
            data={[{ key: 'header' }, { key: 'tabs' }, { key: 'content' }]}
            stickyHeaderIndices={[1]}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
                switch (item.key) {
                    case 'header':
                        return (
                            <View style={styles.top}>
                                <View style={styles.navigator}>
                                    <Pressable style={styles.navigatorButton}>
                                        <Ionicons
                                            name="globe-outline"
                                            size={wp(6.2)}
                                            style={[
                                                styles.icon,
                                                { color: currentColors.text }
                                            ]}
                                        />
                                    </Pressable>
                                    <Pressable style={styles.navigatorButton}>
                                        <Ionicons
                                            name="menu-outline"
                                            size={wp(8)}
                                            style={[
                                                styles.icon,
                                                { color: currentColors.text }
                                            ]}
                                        />
                                    </Pressable>
                                </View>
                                <ProfileInfo />
                                <Pressable
                                    style={[
                                        styles.editButton,
                                        { borderColor: currentColors.gray }
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.editButtonText,
                                            { color: currentColors.text }
                                        ]}
                                    >
                                        {t('profile.editProfile')}
                                    </Text>
                                </Pressable>
                            </View>
                        )
                    case 'tabs':
                        return (
                            <View
                                style={[
                                    styles.tabContainer,
                                    {
                                        borderBottomColor:
                                            currentColors.lightGray,
                                        backgroundColor:
                                            currentColors.background
                                    }
                                ]}
                            >
                                <TouchableOpacity
                                    style={[
                                        styles.tabButton,
                                        { marginLeft: wp(2) },
                                        selectedTab === 'thread'
                                            ? [
                                                  styles.activeTab,
                                                  {
                                                      borderBottomColor:
                                                          currentColors.text
                                                  }
                                              ]
                                            : {}
                                    ]}
                                    onPress={() => setSelectedTab('thread')}
                                >
                                    <Text
                                        style={[
                                            styles.tabText,
                                            { color: currentColors.gray },
                                            selectedTab === 'thread'
                                                ? { color: currentColors.text }
                                                : {}
                                        ]}
                                    >
                                        {t('profile.thread')}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        styles.tabButton,
                                        { marginRight: wp(2) },
                                        selectedTab === 'reposts'
                                            ? [
                                                  styles.activeTab,
                                                  {
                                                      borderBottomColor:
                                                          currentColors.text
                                                  }
                                              ]
                                            : {}
                                    ]}
                                    onPress={() => setSelectedTab('reposts')}
                                >
                                    <Text
                                        style={[
                                            styles.tabText,
                                            { color: currentColors.gray },
                                            selectedTab === 'reposts'
                                                ? { color: currentColors.text }
                                                : {}
                                        ]}
                                    >
                                        {t('profile.reposts')}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )
                    case 'content':
                        return (
                            <View style={{ paddingBottom: 100 }}>
                                {renderContent()}
                            </View>
                        )
                    default:
                        return null
                }
            }}
            keyExtractor={item => item.key}
        />
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    navigator: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: wp(2),
        alignItems: 'center'
    },
    top: {
        paddingVertical: wp(2)
    },
    editButton: {
        marginHorizontal: wp(2),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.6,
        borderRadius: theme.radius.sm,
        paddingVertical: hp(1.2),
        marginTop: hp(1)
    },
    editButtonText: {
        fontSize: wp(4),
        fontWeight: theme.fonts.semibold
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 0.5
    },
    tabButton: {
        paddingVertical: hp(1),
        width: wp(48),
        justifyContent: 'center',
        alignItems: 'center'
    },
    tabText: {
        fontSize: wp(4),
        fontWeight: 'bold'
    },
    activeTab: {
        borderBottomWidth: 1
    }
})
