import cron from 'cron'
import spider from './spider'

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
    cronTime: '0 30 9 * * *',
    onTick: () => {
      spider()
    },
    start: false
  })
  cronJob.start()
}

job()
