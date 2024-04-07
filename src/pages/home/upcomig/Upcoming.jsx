import React, { useState } from 'react'
import useFetch from '../../../hooks/useFetch';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import SwitchTabs from '../../../components/switchTabs/SwitchTabs';
import Carousel from '../../../components/carousel/Carousel';

const Upcoming = () => {
    const [endpoint, setEndpoint] = useState("movie");

    const { data, loading } = useFetch(`/${endpoint}/upcoming`);
    console.log(data);

    const onTabChange = (tab) => {
        setEndpoint(tab === "Movies" ? "movie" : "tv");
    };

    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">Upcoming</span>
                {/* <SwitchTabs
                    data={["Movies", "TV Shows"]}
                    onTabChange={onTabChange}
                /> */}
            </ContentWrapper>
            <Carousel
                data={data?.results}
                loading={loading}
                endpoint={endpoint}
            />
        </div>
    );
}

export default Upcoming