import React from 'react';

export default class BlogPost extends React.Component {
  static get propTypes() {
    return {
      author: React.PropTypes.string,
      section: React.PropTypes.string,
      flyTitle: React.PropTypes.string,
      title: React.PropTypes.string.isRequired,
      dateTime: React.PropTypes.instanceOf(Date),
      dateFormat: React.PropTypes.func,
      text: React.PropTypes.string,
      afterText: React.PropTypes.node,
      itemType: React.PropTypes.string,
      itemProp: React.PropTypes.string,
    };
  }
  static get defaultProps() {
    return {
      itemType: 'http://schema.org/BlogPosting',
      itemProp: 'blogPost',
      dateFormat: (date) => {
        // Sep 19th 2015, 9:49
        function addPostFix(day) {
          const daystr = day.toString();
          const lastChar = daystr.charAt(daystr.length - 1);
          let postFix = '';
          switch (lastChar) {
            case '1':
              postFix = 'st';
              break;
            case '2':
              postFix = 'nd';
              break;
            case '3':
              postFix = 'rd';
              break;
            default:
              postFix = 'th';
              break;
          }
          return `${day}${postFix}`;
        }
        const shortMonthList = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
        let minutes = date.getMinutes() < 10 ? '0' : '';
        minutes += date.getMinutes();
        return `${shortMonthList[date.getMonth()]}
                ${addPostFix(date.getDay())}
                ${date.getFullYear()},
                ${date.getHours()}:${minutes}`;
      },
    };
  }
  render() {
    const content = [];
    const groups = [];
    if (this.props.section) {
      content.push((
        <h3
          className="blog-post__section"
          itemProp="section"
          key={`blog-post__section`}
        >{this.props.section}</h3>
      ));
    }
    if (this.props.flyTitle) {
      content.push((
        <h2
          className="blog-post__flytitle"
          itemProp="alternativeHeadline"
          key={`blog-post__flytitle`}
        >{this.props.flyTitle}</h2>
      ));
    }
    if (this.props.title) {
      content.push((
        <h1
          className="blog-post__title"
          itemProp="headline"
          key={`blog-post__title`}
        >{this.props.title}</h1>));
    }
    if (this.props.dateTime) {
      content.push((
        <time
          className="blog-post__datetime"
          itemProp="dateCreated"
          dateTime={this.props.dateTime}
          key={`blog-post__datetime`}
        >{this.props.dateFormat(this.props.dateTime)}</time>));
    }
    if (this.props.author) {
      content.push((
        <div
          className="blog-post__author"
          itemProp="author"
          key={`blog-post__author`}
        >
          {this.props.author}
        </div>));
    }
    if (this.props.text) {
      content.push((
        <div
          className="blog-post__text"
          itemProp="description"
          key={`blog-post__text`}
          /* eslint-disable react/no-danger */
          dangerouslySetInnerHTML={{
            '__html': this.props.text,
          }}
        />));
    }
    if (this.props.afterText) {
      content.push(this.props.afterText);
    }
    groups.push((
      <div className="blog-post__group-text"
        key={`blog-post__grouptext`}
      >
        {content}
      </div>
    ));

    return (
      <article
        className="blog-post"
        itemScope itemType={this.props.itemType} itemProp={this.props.itemProp}
        role="article"
      >
        {groups}
      </article>
    );
  }
}
