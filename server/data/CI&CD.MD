# CI&CD

## 概念

CI/CD 是一种持续集成和持续交付/部署的开发方法，其中 CI 代表持续集成、CD 则包括持续交付和持续部署。它是指在软件开发过程中，通过自动化构建、测试、打包、部署等流程，来提高代码质量、加快交付速度和降低发布风险的一种方法。

## 特点

1. 持续集成（CI）：持续整合是指将团队成员所做的修改集成到主干（Trunk）上的过程。可以通过使用工具比如 Jenkins, CircleCI 和 Travis CI 等来实现。
2. 持续交付（CD）：持续交付是指自动化构建、测试和部署应用程序到某个环境中的过程。此时，新版本的应用程序会被自动打包并存储在可部署的仓库中，可以随时交付给客户，例如部署到预生产环境。
3. 持续部署（CD）：持续部署是指在持续交付的基础上，把应用程序自动部署到生产环境。这样，每次提交代码后，系统会自动构建、测试和部署，保证了整个交付过程的高效性和自动化性。

CI/CD 的好处是可以避免不同人员之间的代码冲突，减少开发人员的手动部署时间和错误，提高整个项目团队的交付效率和质量。同时，它也可以缩短软件开发周期，快速响应市场需求，降低产品内在风险，保证代码的质量和稳定性。

## 相关工具

Git 版本控制、GitLab 持续集成和自动化部署、Jenkins 持续集成、VM 虚拟机

## GitLab 配置

`.gitlab-ci.yml` 文件是 GitLab CI/CD 的配置文件，用于定义项目的自动化测试、构建和部署任务。

### 步骤

1. 定义全局变量：在 `variables` 中定义全局变量，方便在后续的 job 中引用

   ```yml
   variables:
     DB_HOST: '127.0.0.1'
     DB_PORT: '5432'
   ```

2. 通知 Slack：在 `notify` 中配置 Slack 通知，可以通过 webhook 发送信息到指定的 Slack 频道

   ```yml
   notify:
     slack:
       rooms:
         - secure: 'abcdefg'
       on_success: always
       on_failure: always
   ```

3. 缓存构建结果：在 `cache` 中配置缓存，可以提高构建效率，减少重复下载和编译的时间

   ```yml
   cache:
     key: '$CI_PIPELINE_ID'
     paths:
       - node_modules/
   ```

4. 定义 job：使用 `job` 关键字定义需要执行的任务，可以指定脚本命令、镜像名称、环境变量、依赖关系等参数

   ```yml
   job1:
     before_script:
       - npm install
     script:
       - npm run test
       - npm run build
     artifacts:
       paths:
         - dist/
     only:
       - master

   job2:
     image: docker:latest
     script:
       - docker build .
       - docker push my-registry/my-image
   ```

5. 使用 stages：使用 `stages` 定义多个阶段（stage），每个阶段包含多个 job，可以指定不同 job 的顺序和依赖关系

   ```yml
   stages:
     - test
     - build
     - deploy

   test:
     stage: test
     script:
       - npm run test

   build:
     stage: build
     before_script:
       - npm install
     script:
       - npm run build

   deploy:
     stage: deploy
     script:
       - ansible-playbook deploy.yml
     environment:
       name: production
       url: https://example.com
   ```
