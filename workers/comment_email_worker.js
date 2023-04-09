// const queue = require('../config/kue');
import queue from '../config/kue';

// const commentsMailer = require('../mailers/comments_mailer');
import commentsMailer from '../mailers/comments_mailer';

queue.process('emails', function(job , done){
    console.log('Emails worker is processing a job ', job.data);

    commentsMailer.newComment(job.data);

    done();
});