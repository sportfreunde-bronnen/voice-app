'use strict';

const sfbCourses = require('../service/sfb/website/api/courses');

let self = module.exports = {

  /**
   * List the upcoming events
   *
   * @constructor
   */
  'GetCourseList': async function () {

    let speech = this.speechBuilder();

    // Get the next dates
    sfbCourses.send()
      .then((courses) => {

        let courseList = [];

        speech
          .addText('Unsere Angebote untergliedern sich in Dauer- und Kursangebote. Die Dauerangebote kannst Du als Mitglied der Sportfreunde Bronnen ohne Zusatzkosten besuchen.')
          .addText('Für die Kursangebote fällt eine zusätzliche Gebühr je nach Kurs an.')
          .addBreak('500ms');

        courses.forEach((course) => {
          if (courseList[course.type] === undefined) {
            courseList[course.type] = [];
          }
          courseList[course.type].push(course);
        });

        ['Dauerangebote', 'Kursangebote'].forEach((identifier) => {

          let tempList = [];

          courseList[identifier].forEach((course) => {
            tempList.push(course.title);
          });

          speech
            .addText('Das sind unsere ' + identifier + ': ')
            .addBreak('250ms')
            .addText(self.createChainedList(tempList, 'und') + '.')
            .addBreak('500ms');

        });

        speech.addText('Wofür interessierst Du Dich?');

        this.followUpState('CourseDetailState');
        this.ask(speech, 'Sage den Namen des Kurses, für den Du Dich interessierst');

      })
      .catch((err) => {
        this.tell('Beim Abrufen der nächsten Kurse ist ein Fehler aufgetreten. Bitte versuche es später wieder.');
      });

  },

  'CourseDetailState': {

    'AMAZON.CancelIntent': function () {
      this.removeState();
      this.toIntent('AMAZON.CancelIntent');
    },

    'Unhandled': function () {
      this.ask('Diesen Kurs konnte ich nicht verstehen. Versuche es nochmal! Sage zum Beispiel Zumba, wenn Du Dich für Zumba interessierst.', 'Nenne mir nun den Namen des Kurses, für den Du Dich interessierst.');
    },

    'AMAZON.HelpIntent': function () {
      this.ask('Nenne mir nun den Namen des Kurses, für den Du Dich interessierst. Sage zum Beispiel Zumba, wenn Du Dich für Zumba interessierst.', 'Nenne mir nun den Namen des Kurses, für den Du Dich interessierst.');
    },

    'AMAZON.NoIntent': function () {
      this.removeState();
      this.toIntent('AMAZON.StopIntent');
    },

    'CourseDetail': function () {

      const courseId = this.getInput('COURSE').id;
      let speech = this.speechBuilder();
      let finalCourse = undefined;

      if (courseId === undefined) {
        // Not a valid course mapping
        this.ask('Ich konnte den Namen des Kurses leider nicht verstehen. Bitte nenne ihn nun erneut.', 'Wiederhole den Namen des Kurses');
      } else {
        // We have a valid course. Get details
        sfbCourses.send()
          .then((courses) => {
            // Get the correct course
            courses.some((course) => {
              if (course.id === courseId) {
                finalCourse = course;
                return true;
              }
              return false;
            });

            speech
              .addText('Es folgen Informationen zu unserem ' + finalCourse.type.slice(0, -1) + ' ' + finalCourse.title + '.')
              .addBreak('250ms')
              .addText(finalCourse.text)
              .addBreak('250ms')
              .addText('Zu folgenden Zeiten findet der Kurs statt:')
              .addText(finalCourse.times.replace(/(\d{1,2}:\d{1,2}) ?[-–] ?(\d{1,2}:\d{1,2})/g, "$1 bis $2") + '.')
              .addBreak('250ms')
              .addText('Der Kurs findet hier statt: ')
              .addText(finalCourse.place + '.')
              .addBreak('250ms')
              .addText('Weitere Informationen zu Kosten oder der Anmeldung finden Sie auf unserer Webseite www.sf-bronnen.de.')
              .addBreak('250ms')
              .addText('Interessierst Du Dich noch für einen weiteren Kurs? Wenn ja, für welchen?');

            this.ask(speech, 'Nenne mir nun den Kurs, für den Du Dich noch interessierst.');

          })
          .catch((err) => {
            this.tell('Beim Abrufen der Kursinformationen ist ein Problem aufgetreten. Bitte versuche es später erneut.');
          });
      }

    },

  },

  createChainedList(list, chainWord = 'und') {
    if (list.length === 0) {
      return 'Keine Angabe';
    }
    if (list.length <= 1) {
      return list[0];
    }
    let chainedList = list.join(', ');
    const deleteFromIndex = chainedList.lastIndexOf(', ');
    const deleteToIndex = deleteFromIndex + 2;
    const attach = chainedList.substr(deleteToIndex);
    const fixture = chainedList.substr(0, deleteFromIndex);
    return fixture + ' ' + chainWord + ' ' + attach;
  }

};