import React, { useEffect, useRef, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Hidden from '@ui/Hidden';
import FlexRow from '@ui/FlexRow';
import { StickyContainer, StickyItem } from '@ui/Sticky';
import { selectedCategoryIdSelector, useCategoriesActions } from '@store/categories';

import { Page, PageSection, PageAside, PageContent } from '@components/Page';
import CatalogFilters from './components/CatalogFilters';
import CatalogGrid from './components/CatalogGrid';

const CatalogPage = (props) => {
    const routeParams = useParams();
    const selectedId = useSelector(selectedCategoryIdSelector);
    const { onCategorySelect } = useCategoriesActions();

    useEffect(() => {
        if (!selectedId) {
            const path = Object.keys(routeParams).map((key) => routeParams[key]);

            onCategorySelect(null, path);
        }
    }, [routeParams, selectedId, onCategorySelect]);

    return (
        <Page className="catalog-page">
            <PageSection>
                <StickyContainer>
                    <FlexRow noWrap className="catalog-page__layout">
                        <Hidden lgDown component={null}>
                            <PageAside>
                                <StickyItem scrollbar minHeight={300}>
                                    <CatalogFilters />
                                </StickyItem>
                            </PageAside>
                        </Hidden>
                        <PageContent>
                            <CatalogGrid />
                        </PageContent>
                    </FlexRow>
                </StickyContainer>
            </PageSection>
            <PageSection>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium blanditiis
                natus accusamus, fugiat nam rem ratione nemo quam exercitationem reprehenderit esse
                quia, commodi repellat deleniti quasi aliquam debitis qui molestias.
                <br />
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima, debitis. Soluta
                nobis non dolorem amet error vero obcaecati numquam tempora deleniti exercitationem
                consequuntur aspernatur illum, doloremque molestias voluptates nihil voluptatibus.
                <br />
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium blanditiis
                natus accusamus, fugiat nam rem ratione nemo quam exercitationem reprehenderit esse
                quia, commodi repellat deleniti quasi aliquam debitis qui molestias.
                <br />
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima, debitis. Soluta
                nobis non dolorem amet error vero obcaecati numquam tempora deleniti exercitationem
                consequuntur aspernatur illum, doloremque molestias voluptates nihil voluptatibus.
                <br />
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium blanditiis
                natus accusamus, fugiat nam rem ratione nemo quam exercitationem reprehenderit esse
                quia, commodi repellat deleniti quasi aliquam debitis qui molestias.
                <br />
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima, debitis. Soluta
                nobis non dolorem amet error vero obcaecati numquam tempora deleniti exercitationem
                consequuntur aspernatur illum, doloremque molestias voluptates nihil voluptatibus.
                <br />
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium blanditiis
                natus accusamus, fugiat nam rem ratione nemo quam exercitationem reprehenderit esse
                quia, commodi repellat deleniti quasi aliquam debitis qui molestias.
                <br />
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima, debitis. Soluta
                nobis non dolorem amet error vero obcaecati numquam tempora deleniti exercitationem
                consequuntur aspernatur illum, doloremque molestias voluptates nihil voluptatibus.
                <br />
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium blanditiis
                natus accusamus, fugiat nam rem ratione nemo quam exercitationem reprehenderit esse
                quia, commodi repellat deleniti quasi aliquam debitis qui molestias.
                <br />
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima, debitis. Soluta
                nobis non dolorem amet error vero obcaecati numquam tempora deleniti exercitationem
                consequuntur aspernatur illum, doloremque molestias voluptates nihil voluptatibus.
                <br />
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium blanditiis
                natus accusamus, fugiat nam rem ratione nemo quam exercitationem reprehenderit esse
                quia, commodi repellat deleniti quasi aliquam debitis qui molestias.
                <br />
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima, debitis. Soluta
                nobis non dolorem amet error vero obcaecati numquam tempora deleniti exercitationem
                consequuntur aspernatur illum, doloremque molestias voluptates nihil voluptatibus.
                <br />
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium blanditiis
                natus accusamus, fugiat nam rem ratione nemo quam exercitationem reprehenderit esse
                quia, commodi repellat deleniti quasi aliquam debitis qui molestias.
                <br />
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima, debitis. Soluta
                nobis non dolorem amet error vero obcaecati numquam tempora deleniti exercitationem
                consequuntur aspernatur illum, doloremque molestias voluptates nihil voluptatibus.
                <br />
            </PageSection>
        </Page>
    );
};

export default CatalogPage;
