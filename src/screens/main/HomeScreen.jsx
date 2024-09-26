import React from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import ScreenWapper from '../../components/ScreenWapper'
import Thread from '../../components/thread/Thread'
import theme from '../../constants/theme'

const HomeScreen = () => {
    const dispatch = useDispatch()
    const { t } = useTranslation()

    const isDarkMode = useSelector(state => state.theme.isDarkMode)
    const currentColors = isDarkMode
        ? theme.colors.darkMode
        : theme.colors.lightMode

    const threadData = [
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

    return (
        <ScreenWapper
            styles={{
                backgroundColor: currentColors.background
            }}
        >
            <FlatList
                data={threadData}
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
        </ScreenWapper>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})
