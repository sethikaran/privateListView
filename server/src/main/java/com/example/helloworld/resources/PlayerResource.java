package com.example.helloworld.resources;

import com.codahale.metrics.annotation.Timed;
import com.example.helloworld.core.Player;
import com.example.helloworld.db.PlayerDAO;
import io.dropwizard.jersey.caching.CacheControl;
import io.dropwizard.hibernate.UnitOfWork;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Path("/players")
@Produces(MediaType.APPLICATION_JSON)
public class PlayerResource {

    private final PlayerDAO playerDAO;

    public PlayerResource(PlayerDAO playerDAO) {
        this.playerDAO = playerDAO;
    }

    @GET
    @Timed(name = "player-list")
    @CacheControl(maxAge = 1, maxAgeUnit = TimeUnit.DAYS)
    @UnitOfWork
    public List<Player> sayHello() {
        return playerDAO.findAll();
    }
}
