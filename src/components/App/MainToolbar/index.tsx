import { useCallback } from 'react'
import styled from 'styled-components'
import AddContentIcon from '~/components/Icons/AddContentIcon'
import AddSourceIcon from '~/components/Icons/AddSourceIcon'
import SentimentDataIcon from '~/components/Icons/SentimentDataIcon'
import SettingsIcon from '~/components/Icons/SettingsIcon'
import SourcesTableIcon from '~/components/Icons/SourcesTableIcon'
import { Flex } from '~/components/common/Flex'
import { Text } from '~/components/common/Text'
import { SecondarySidebarActiveTab, useAppStore } from '~/stores/useAppStore'
import { graphStyles, useDataStore } from '~/stores/useDataStore'
import { AddNodeModalData, useModal } from '~/stores/useModalStore'
import { colors } from '~/utils/colors'

export const MainToolbar = () => {
  const [setSecondarySidebarActiveTab] = useAppStore((s) => [s.setSecondarySidebarActiveTab])
  const [graphStyle, setGraphStyle] = useDataStore((s) => [s.graphStyle, s.setGraphStyle])

  const { open, setAddNodeModalData } = useModal('addNode')

  const handleOpenSidebar = (tab: SecondarySidebarActiveTab) => {
    setSecondarySidebarActiveTab(tab)
  }

  const handleOpenModal = (data: AddNodeModalData) => {
    open()
    setAddNodeModalData(data)
  }

  const changeGraphType = useCallback(() => {
    const nextStyleIndex: number = graphStyles.findIndex((f) => f === graphStyle) + 1

    if (graphStyles[nextStyleIndex]) {
      setGraphStyle(graphStyles[nextStyleIndex])
    } else {
      setGraphStyle(graphStyles[0])
    }
  }, [graphStyle, setGraphStyle])

  return (
    <FooterAction>
      <LogoButton onClick={() => handleOpenSidebar('about')}>
        <img alt="Second brain" src="logo.svg" />
      </LogoButton>
      <ActionButton onClick={() => handleOpenModal('content')}>
        <IconWrapper>
          <AddContentIcon />
        </IconWrapper>
        <Text>Add Content</Text>
      </ActionButton>
      <ActionButton onClick={() => handleOpenModal('source')}>
        <IconWrapper>
          <AddSourceIcon />
        </IconWrapper>
        <Text>Add Source</Text>
      </ActionButton>
      <ActionButton id="cy-open-soure-table" onClick={() => handleOpenSidebar('sources')}>
        <IconWrapper>
          <SourcesTableIcon />
        </IconWrapper>
        <Text>Source Table</Text>
      </ActionButton>
      <ActionButton id="cy-open-sentiment-data" onClick={() => handleOpenSidebar('sentiment')}>
        <IconWrapper>
          <SentimentDataIcon />
        </IconWrapper>
        <Text>Sentiment Data</Text>
      </ActionButton>
      <ActionButton onClick={() => changeGraphType()}>
        <IconWrapper>
          <SettingsIcon />
        </IconWrapper>
        <Text>Change Display</Text>
      </ActionButton>
    </FooterAction>
  )
}

const FooterAction = styled(Flex).attrs({
  align: 'flex-start',
  direction: 'column',
  grow: 1,
  justify: 'flex-start',
})`
  width: 64px;
  z-index: 31;
  transition: opacity 1s;
  background: ${colors.BG2};
`

const LogoButton = styled(Flex)`
  background: blue;
  align-items: center;
  justify-content: center;
  background: ${colors.primaryBlue};
  width: 64px;
  height: 64px;
  cursor: pointer;
`

const ActionButton = styled(Flex).attrs({
  align: 'center',
  justify: 'center',
  p: 0,
})`
  position: relative;
  width: 64px;
  height: 58px;
  padding: 0;
  flex-direction: row;
  color: ${colors.GRAY6};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.create(['opacity', 'box-shadow', 'background-color'])};

  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 4px; /* Initial width */
    height: 32px; /* Initial height on hover */
    background-color: transparent;
    transition: height 0.3s, width 0.3s, background-color 0.3s;
  }

  ${Text} {
    display: none;
    opacity: 0;
    width: 0;
    padding: 4px 10px;
    border-radius: 4px;
    background: #000;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.25);
    position absolute;
    left: 90%;
    z-index: 99;
    white-space: nowrap;
    visibility: visible;
    font-size: 11px;
    font-style: normal;
    font-weight: 400;
    transition: ${({ theme }) => theme.transitions.create(['opacity', 'visually'])};
  }

  &:hover {
     color: ${colors.white};

    &:before {
      width: 3px;
      height: 32px;
      background-color: ${colors.primaryBlue};
    }

    ${Text} {
      display: block;
      width: min-content;
      opacity: 1;
      visibility: visible;
    }
  }

  &:active {
    color: ${colors.white};
    background: ${colors.black};
    &:before {
      width: 3px;
      height: 100%;
      background-color: ${colors.primaryBlue};
    }
  }

  &.root {
    border-radius: 50%;
    padding: 0;
    align-items: center;
    justify-content: center;
    border: none;
  }
`

const IconWrapper = styled(Flex)`
  justify-content: center;
  align-items: center;
  font-size: 24px;
`