import {useEffect, useState} from "react";
import {Button, Card, CardActions, CardContent, CardMedia, Grid, Pagination, Typography} from "@mui/material";
import axios from "axios";

const NewsPage = () => {
    const [news, setNews] = useState({articles: [], totalResults: 0});
    const [pagination, setPagination] = useState({page: 1, count: 1});

    const apiKey = process.env.REACT_APP_NEW_API_KEY;
    const searchParam = "ukraine";
    const lang = "uk";
    const pageSize = 20;

    const changePageHandler = (event, value) => {
        setPagination({...pagination, page: value});
    }

    const newsRequest = async () => {
        const url = `https://newsapi.org/v2/everything?apiKey=${apiKey}&q=${searchParam}&language=${lang}&pageSize=${pageSize}&page=${pagination.page}`;

        const response = await axios.get(url);
        setNews(response.data);
        const pageCount = Math.ceil(response.data.totalResults / pageSize);
        setPagination({...pagination, count: pageCount});
    }

    useEffect(() => {
        newsRequest();
        window.scrollTo(0, 0);
    }, [pagination.page]);

    return (
        <>
            <div style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "20px", marginTop: "20px"}}>
                {
                    news.articles.map((article) => (
                        <Grid size={3} key={article.publishedAt}>
                            <Card sx={{maxWidth: 345, height: "100%"}}>
                                <CardMedia
                                    sx={{height: 140}}
                                    image={article.urlToImage}
                                    title={article.title}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {article.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                        {article.description}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <a href={article.url}>
                                        <Button size="small">Learn More</Button>
                                    </a>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))
                }
            </div>
            <div style={{display: "flex", justifyContent: "center", padding: "15px"}}>
                <Pagination color="primary" page={pagination.page} count={pagination.count}
                            onChange={changePageHandler}/>
            </div>
        </>
    )
}

export default NewsPage;