import React, { useEffect, useState } from 'react';
import { Grid, List, Loader, Segment } from 'semantic-ui-react';
import ActivityList from "./ActiviytList"
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import ActivityFilters from './ActivityFilters'
import { PagingParams } from '../../../app/models/paginations';
import InfiniteScroll from 'react-infinite-scroller';
import ActivityListItemPlaceholder from './ActivityListItemPlaceholder';





export default observer(function ActivityDashboard() {

    const { activityStore } = useStore();
    const { loadActivities, activityRegistry, setPagingParams, pagination } = activityStore;
    const [loadingNext, setLoadingNext] = useState(false);

    function handleGetNext() {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1))
        loadActivities().then(() => setLoadingNext(false));
    }

    useEffect(() => {
        if (activityRegistry.size <= 1)
            loadActivities();

    }, [activityRegistry.size, loadActivities]);




    return (
        <Grid  container stackable>

        <Grid.Row columns={2}>
                <Grid.Column computer={4} mobile={16}>
                 
                        <ActivityFilters />
                         <Loader active={loadingNext} />
                   
                </Grid.Column>
                <Grid.Column computer={11} mobile={16}>
                       
                                {activityStore.loadingInitial && !loadingNext ? (
                                    <>
                                        <ActivityListItemPlaceholder />
                                        <ActivityListItemPlaceholder />
                                    </>
                            ) : (
                                <List>
                                    <InfiniteScroll
                                        pageStart={0}
                                        loadMore={handleGetNext}
                                        hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPage}
                                        initialLoad={false}
                                    >
                                        < ActivityList />
                                    </InfiniteScroll>
                                </List>
                            )}

                        
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
})