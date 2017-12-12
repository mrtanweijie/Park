import cron from 'cron'
import spider from './spider'
import cronConfig from './config/cron'

/**
 *  # ┌────────────── second (optional)
 *  # │ ┌──────────── minute
 *  # │ │ ┌────────── hour
 *  # │ │ │ ┌──────── day of month
 *  # │ │ │ │ ┌────── month
 *  # │ │ │ │ │ ┌──── day of week
 *  # │ │ │ │ │ │
 *  # │ │ │ │ │ │
 *  # * * * * * *
 */
function job () {
  let cronJob = new cron.CronJob({
    cronTime: cronConfig.cronTime,
    onTick: () => {
      spider()
    },
    start: false
  })
  cronJob.start()
}

job()
