package ca.polymtl.seodin.config;

import io.github.jhipster.config.JHipsterProperties;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.expiry.Duration;
import org.ehcache.expiry.Expirations;
import org.ehcache.jsr107.Eh107Configuration;

import java.util.concurrent.TimeUnit;

import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.cloud.client.serviceregistry.Registration;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
@AutoConfigureAfter(value = { MetricsConfiguration.class })
@AutoConfigureBefore(value = { WebConfigurer.class, DatabaseConfiguration.class })
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(Expirations.timeToLiveExpiration(Duration.of(ehcache.getTimeToLiveSeconds(), TimeUnit.SECONDS)))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(ca.polymtl.seodin.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(ca.polymtl.seodin.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(ca.polymtl.seodin.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(ca.polymtl.seodin.domain.SocialUserConnection.class.getName(), jcacheConfiguration);
            cm.createCache(ca.polymtl.seodin.domain.Study.class.getName(), jcacheConfiguration);
            cm.createCache(ca.polymtl.seodin.domain.Study.class.getName() + ".developers", jcacheConfiguration);
            cm.createCache(ca.polymtl.seodin.domain.Study.class.getName() + ".softwareSystems", jcacheConfiguration);
            cm.createCache(ca.polymtl.seodin.domain.SoftwareSystem.class.getName(), jcacheConfiguration);
            cm.createCache(ca.polymtl.seodin.domain.SoftwareSystem.class.getName() + ".sourceCodes", jcacheConfiguration);
            cm.createCache(ca.polymtl.seodin.domain.Task.class.getName(), jcacheConfiguration);
            cm.createCache(ca.polymtl.seodin.domain.Developer.class.getName(), jcacheConfiguration);
            cm.createCache(ca.polymtl.seodin.domain.Developer.class.getName() + ".interviews", jcacheConfiguration);
            cm.createCache(ca.polymtl.seodin.domain.Developer.class.getName() + ".diaries", jcacheConfiguration);
            cm.createCache(ca.polymtl.seodin.domain.Developer.class.getName() + ".thinkAlouds", jcacheConfiguration);
            cm.createCache(ca.polymtl.seodin.domain.Developer.class.getName() + ".defects", jcacheConfiguration);
            cm.createCache(ca.polymtl.seodin.domain.Developer.class.getName() + ".testCases", jcacheConfiguration);
            cm.createCache(ca.polymtl.seodin.domain.Developer.class.getName() + ".interactiveLogs", jcacheConfiguration);
            cm.createCache(ca.polymtl.seodin.domain.Interview.class.getName(), jcacheConfiguration);
            cm.createCache(ca.polymtl.seodin.domain.Interview.class.getName() + ".audios", jcacheConfiguration);
            cm.createCache(ca.polymtl.seodin.domain.Interview.class.getName() + ".videos", jcacheConfiguration);
            cm.createCache(ca.polymtl.seodin.domain.Interview.class.getName() + ".notes", jcacheConfiguration);
            cm.createCache(ca.polymtl.seodin.domain.ThinkAloud.class.getName(), jcacheConfiguration);
            cm.createCache(ca.polymtl.seodin.domain.ThinkAloud.class.getName() + ".notes", jcacheConfiguration);
            cm.createCache(ca.polymtl.seodin.domain.ThinkAloud.class.getName() + ".videos", jcacheConfiguration);
            cm.createCache(ca.polymtl.seodin.domain.Diary.class.getName(), jcacheConfiguration);
            cm.createCache(ca.polymtl.seodin.domain.Audio.class.getName(), jcacheConfiguration);
            cm.createCache(ca.polymtl.seodin.domain.Video.class.getName(), jcacheConfiguration);
            cm.createCache(ca.polymtl.seodin.domain.Note.class.getName(), jcacheConfiguration);
            cm.createCache(ca.polymtl.seodin.domain.Defect.class.getName(), jcacheConfiguration);
            cm.createCache(ca.polymtl.seodin.domain.TestCase.class.getName(), jcacheConfiguration);
            cm.createCache(ca.polymtl.seodin.domain.InteractiveLog.class.getName(), jcacheConfiguration);
            cm.createCache(ca.polymtl.seodin.domain.SourceCode.class.getName(), jcacheConfiguration);
            cm.createCache(ca.polymtl.seodin.domain.SourceCode.class.getName() + ".designPatterns", jcacheConfiguration);
            cm.createCache(ca.polymtl.seodin.domain.DesignPattern.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
