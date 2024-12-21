import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useLanguage, useTheme } from '../../contexts'
import { hp, wp } from '../../utils'

const ProfileTabs = ({ selectedTab, handleChangeTab }) => {
    const { t } = useLanguage()
    const { currentColors } = useTheme()
    const navigation = useNavigation()

    return (
        <View
            style={[
                styles.tabContainer,
                {
                    borderBottomColor: currentColors.lightGray,
                    backgroundColor: currentColors.background
                }
            ]}
        >
            <TouchableOpacity
                style={[
                    styles.tabButton,
                    { marginLeft: wp(2) },
                    selectedTab === 'thread' && [
                        styles.activeTab,
                        { borderBottomColor: currentColors.text }
                    ]
                ]}
                onPress={() => handleChangeTab('thread')}
            >
                <Text
                    style={[
                        styles.tabText,
                        { color: currentColors.gray },
                        selectedTab === 'thread' && {
                            color: currentColors.text
                        }
                    ]}
                >
                    {t('profile.thread')}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[
                    styles.tabButton,
                    { marginRight: wp(2) },
                    selectedTab === 'reposts' && [
                        styles.activeTab,
                        { borderBottomColor: currentColors.text }
                    ]
                ]}
                onPress={() => handleChangeTab('reposts')}
            >
                <Text
                    style={[
                        styles.tabText,
                        { color: currentColors.gray },
                        selectedTab === 'reposts' && {
                            color: currentColors.text
                        }
                    ]}
                >
                    {t('profile.reposts')}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default ProfileTabs

const styles = StyleSheet.create({
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
