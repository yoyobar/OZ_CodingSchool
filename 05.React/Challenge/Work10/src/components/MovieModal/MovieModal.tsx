import styled from 'styled-components';
import { basePath } from '../../constant';
import React, { useRef } from 'react';
import useOnClickOutside from '../../hooks/useOnClickOutsite';

interface MovieModalProps {
    setModalOpen: (set: boolean) => void;
    backdrop_path?: string;
    title?: string;
    name?: string;
    overview?: string;
    release_date?: string;
    first_air_date?: string;
    vote_average?: string;
}

const Presentation = styled.div`
    z-index: 1200;
    position: absolute;
`;

const Wrapper_Modal = styled.div`
    position: fixed;
    inset: 0px;
    background-color: rgb(0 0 0 / 71%);
    display: flex;
    justify-content: center;

    @media screen and (max-width: 768px) {
        padding: 0;
    }

    @media screen and (max-height: 768px) {
        align-items: unset;
        padding-top: 2rem;
    }
`;

const Modal = styled.div`
    position: relative;
    max-width: 800px;
    box-shadow:
        0px 3px 5px -1px rgba(0, 0, 0, 0.2),
        0px 5px 8px 0px rgba(0, 0, 0, 0.14),
        0px 1px 14px 0px rgba(0, 0, 0, 0.12);
    background-color: #111;
    overflow: hidden;
    border-radius: 8px;
    transition: all 400ms ease-in-out 2s;
    animation: fadeIn 400ms;

    ::webkit-scrollbar {
        display: none;
        visibility: hidden;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: scale(0.5);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }

    @media screen and (max-width: 768px) {
        overflow-y: scroll !important;
    }

    @media screen and (max-height: 768px) {
        overflow-y: scroll;
    }
`;

const Close = styled.span`
    position: absolute;
    right: 20px;
    top: 20px;
    cursor: pointer;
    z-index: 1000;
    color: white;
`;

const Img = styled.img`
    width: 100%;
    height: auto;
`;

const Content = styled.div`
    padding: 40px;
    color: white;
`;

const Details = styled.p`
    font-weight: 600;
    font-size: 18px;

    @media screen and (max-width: 768px) {
        font-size: 16px;
    }
`;

const Title = styled.h2`
    padding: 0;
    font-size: 40px;
    margin: 16px 0;
`;

const OverView = styled.p`
    font-size: 20px;
    line-height: 1.5;

    @media screen and (max-width: 768px) {
        font-size: 16px;
    }
`;

const MovieModal = ({
    setModalOpen,
    backdrop_path,
    title,
    name,
    overview,
    release_date,
    first_air_date,
    vote_average,
}: MovieModalProps) => {
    const ref = useRef<HTMLDivElement | null>(null);

    useOnClickOutside(ref, () => {
        setModalOpen(false);
    });
    console.log(ref);
    return (
        <Presentation>
            <Wrapper_Modal>
                <Modal ref={ref}>
                    <Close onClick={() => setModalOpen(false)}>X</Close>
                    <Img alt='modal_post-img' src={`${basePath}${backdrop_path}`}></Img>
                    <Content>
                        <Details>
                            <span>100% for you</span> {release_date ? release_date : first_air_date}{' '}
                        </Details>
                        <Title>{title ? title : name}</Title>
                        <OverView>평점 : {vote_average}</OverView>
                        <OverView>{overview}</OverView>
                    </Content>
                </Modal>
            </Wrapper_Modal>
        </Presentation>
    );
};

export default MovieModal;
